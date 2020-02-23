let accessKey= "ec91d14b72ee9a82fe446319e65d80dc"
document.getElementById("DateSubmit").addEventListener("click", function(event) {
    event.preventDefault();
    const dateFrom = document.getElementById("dateFrom").value;
    const dateTo =document.getElementById("dateTo").value;
    if (dateFrom == "" || dateTo =="")
        return;
    let url ="https://api.themoviedb.org/3/discover/movie?api_key="+accessKey+"&language=en-US&sort_by=release_date.asc&include_adult=false&include_video=false&page=1&"
    url+="primary_release_date.gte="+dateFrom+"&primary_release_date.lte="+dateTo
    fetch(url)
    .then(function(response){
        return response.json();
    })
    .then(function(json){
      let newContainer="";
      newContainer+='<div class="card-deck">';
        for(let i=0 ; i < json.results.length;i++){
            if (i%4 == 0 && i !=0){
                newContainer += '</div><br><div class="card-deck">'
            }
            newContainer+=CreateCard(json.results[i],i);
            document.getElementById("movies").innerHTML=newContainer;
        }
        document.getElementById("footerBetha").style.position = "inherit";
           
    });
   
});

addEventListener("click", function(event) {
  if(event.target.id.includes("SeeMovie")){
    let url= 'https://api.themoviedb.org/3/movie/'+event.target.value+'?api_key=ec91d14b72ee9a82fe446319e65d80dc&language=en-US';
    fetch(url)
    .then(function(response){
      return response.json();
  })
    .then(function(json){
      let percent= parseInt(json.vote_average)*10
      let result='<div class="card "> <div class="row no-gutters"><div class="col-md-4">'
      result+='<img src="https://image.tmdb.org/t/p/w500/'+ json.poster_path +'" class="card-img" alt="...">  </div>';
      result+='<div class="col-md-8" style="padding: 80px; ><div class="card-body"><div class="row"> <div class="col-md-9">'
      result+='<h2 class="card-title text-center">'+json.title+'</h2></div>'
      result+=' <div class="col-md-3"><p class="dateCard text-right">'+json.release_date+'</p></div>'
      result+='<h6>OverView : </h6><p class="card-text">'+ json.overview+'</p></div><br>'
      result +='<div class="row text-center"> <div class="col-md-6"> <h6> Genres</h6><p>'+ json.genres[0].name+'</p></div>'
      result+= '<div class="col-md-6"><h6> Language </h6><p>'+json.original_language+'</p></div> </div>'
      result+= '<div><h6> Home Page </h6> <a href="'+ json.homepage +' style="color:black;">'+ json.homepage +'</a><br><br>'
      result+='<div class="progress"><div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" '
      result+='style="width:'+percent +'% " > '+percent+ '% vote average </div> </div>'
      result+='</div>'

      document.getElementById("movies").innerHTML=result;
    })
   
}

});
function GetLanguage(movie){
  let language ="<p> Language : ";
  for (let i =0; i < movie.spoken_languages.length;i++){
    if(  movie.spoken_languages[i].name = ""){
      return language+= "None</p>"
    }
    language += movie.spoken_languages[i].name +' | '
  }
  return language+="</p>"
}


function CreateCard(movie,x){
  let card=""
    card+='<div class="card text-center">'
    card+= '<img src="https://image.tmdb.org/t/p/w500/'+movie.poster_path+'" class="card-img-top" alt="...">'
    card+=' <div class="card-body"><h5 class="card-title" id="'+movie.id+'">'+movie.title+'</h5>'
    card += '<h6 class="card-subtitle mb-2 text-muted">'+ movie.release_date +'</h6>'
    card+='</div><div class="text-center"><button class="btn btn-primary" id="SeeMovie'+x+'" value="'+movie.id+'">Read More</button>'
    card+= '</div></div>'
    
    return card;
}
