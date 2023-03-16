const express = require("express");
const Movie = require("../models/Movie");
const {totalPoints} = require("../utils");

var queryObj = {
    durationfilter: "100,150"
}



exports.getMovies = async (req,res)=>{
    //filtrelerde eğer doesnt matter işaretlenirse olabilecek en esnek sınırları koy.
    var {durationFilter,date,languages,imdbRate,metaRate,warnings,genres,actors,popularity,country,popularity,director,popularity,features,type} = req.query; // duration filter will be a string with format small,big
    var durationFilter = durationFilter.split(",");
    var date = date.split(",");
    features = features.split(",");
    genres.length>1 ? genres=  genres.split(",") : genres;
    actors = actors.split(",");
    country = country.split(",");

    var data = await Movie.find({ duration: { $lte:Number(durationFilter[1]),$gte:Number(durationFilter[0])}, 
        genres: {$in: genres},
        date: { $lte:Number(date[1]), $gte:Number(date[0])},
        language: languages,
        //meta_score: { $gte:parseFloat(metaRate)}, 
        //imdb_rating: {$gte: parseFloat(imdbRate)},
        warnings: {$ne: warnings},
        popularity:popularity
        })
    
    var maxPoints = totalPoints(genres,actors,popularity,country,director,features,type) 
    
    //calculate points.
    data.forEach((movie,index)=>{
        features.forEach((feature)=>{
            if(movie.features.includes(feature)){
                movie.points += 5
            }
        })

        genres.forEach((genre)=>{
            if(movie.genre.includes(genre)){
                movie.points += 7
            }
            else{
                movie.noMatch.push(`${genre} genre`)
            }
        })
        
        actors.forEach((actor)=>{
            if(movie.actors.includes(actor)){
                movie.points += 10
            }
            else{
                movie.noMatch.push(`actor ${actor}`)
            }
        })
        if(movie.popularity === popularity){
            movie.points +=5
        }
        else{
            movie.noMatch.push(`${popularity} popularity`)
        }
        if(movie.movie_type === type){
            movie.points += 10;
        }
        country.forEach((country)=>{
            if(movie.country.includes(country)){
                movie.points += 8
            }
            else{
                movie.noMatch.push(`${country} country`)
            }
        })
        if(movie.imdb_rating < imdbRate){
        movie.points -= (imdbRate-movie.imdb_rating) * 3
        movie.noMatch.push("the selected imdb rating")
        }
        if(movie.meta_rating < metaRate){
        movie.points -= (metaRate-movie.meta_rating) / 3.3
        movie.noMatch.push("the selected meta rating")
        }

        if(movie.director === director){
            movie.points += 15;
        }
        else{
            movie.noMatch.push("director")
        }
        if(movie.movie_type === type){
            movie.points += 5;
        }
        else{
            movie.noMatch.push("type");
        }
        
    })
    data.forEach((item,index)=>{ // FIX
        item.points += 18
    })
    let sortedData = data.sort((m1,m2)=>(m1.points < m2.points) ? 1 :  (m1.points > m2.points) ? -1  : 0);
    sortedData = sortedData.slice(0,50);
    
    
    res.json({
        
        status: "success",
        length: sortedData.length,
        data: sortedData,
        maxPoints: maxPoints
    });
}
