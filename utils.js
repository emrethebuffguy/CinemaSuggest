exports.totalPoints = (genres,actors,popularity,country,director,features,type)=>{
    var maxPoints = 0;
    
    maxPoints += genres.length * 15 // 14
    maxPoints += actors.length *10 // 10
    maxPoints +=  5 // 5 for popularity
    maxPoints +=  country.length* 8 //  8 for country
    maxPoints += director ? 15 : 0 // for director 
    maxPoints += features.length*5 
    maxPoints += type ? 5 : 0
    return maxPoints
    }



exports.pickTwenty = (movies)={

}