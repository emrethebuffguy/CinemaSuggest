exports.totalPoints = (genres,actors,popularity,country,director,features)=>{
    var maxPoints = 0;
    
    maxPoints += genres.length * 15 // 14
    maxPoints += actors.length *10 // 10
    maxPoints +=  5 // 5 for popularity
    maxPoints +=  country.length* 8 //  8 for country
    maxPoints += 15 // for director 
    maxPoints += features.length*5 
    return maxPoints
    }



exports.pickTwenty = (movies)={

}