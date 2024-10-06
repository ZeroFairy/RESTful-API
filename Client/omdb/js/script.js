function searchMovie() {
    $('#movie-list').html('');
    
    $.ajax({
        url: 'http://www.omdbapi.com',
        type: 'get',
        dataType: 'json',
        data: {
            'apikey': 'fd55cb8a',
            's': $('#search-input').val()
        },
        success: function (result) {
            console.log(result);
            if (result.Response == "True") {
                let movies = result.Search;
                console.log(movies);
    
                $.each(movies, function (i, data) {
                    $('#movie-list').append(`
                        <div class="col-md-4">
                            <div class="card mb-4" style="width: 18rem;">
                                <img src="`+data.Poster+`" class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title">`+data.Title+`</h5>
                                    <h6 class="card-subtitle mb-2 text-body-secondary">` +data.Year+ `</h6>
                                    <a href="#" class="card-link see-detail" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="` +data.imdbID+ `">See Detail</a>
                                </div>
                            </div>
                        </div>
                    `);
                });
    
                $('#search-input').val('');
            } else {
                // $('#movie-list').html('<h2 class="text-center"> '+result.Error+' </h2>');
                $('#movie-list').html(`
                    <div class="col">
                        <h2 class="text-center"> `+result.Error+` </h2>
                    </div>
                `);
            }
        }
    });
};

$('#search-button').on('click', function () {
    searchMovie();
});

$('#search-input').on('keyup', function(e) {
    if(e.keyCode == 13) {
        searchMovie();
    }
});

// event binding 
$('#movie-list').on('click', '.see-detail', function () { 
    $.ajax({
        url: 'http://www.omdbapi.com',
        type: 'get',
        dataType: 'json',
        data: {
            'apikey': 'fd55cb8a',
            'i': $(this).data('id')
        },
        success: function (movie) {
            console.log(movie.Title);
            if (movie.Response === "True") {
                $('.modal-body').html(`
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-4">
                                <img src="`+movie.Poster+`" class="img-fluid">
                            </div>

                            <div class="col-md-8">
                                <h3>`+movie.Title+`</h3>

                                <table class="table table-bordered">
                                    <tbody>
                                        <tr>
                                            <th scope="row">Released</th>
                                            <td>`+movie.Released+`</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Genre</th>
                                            <td>`+movie.Genre+`</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Director</th>
                                            <td>`+movie.Director+`</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Actors</th>
                                            <td>`+movie.Actors+`</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                `);
            }
        }
    });
});

//Dari video
// $('#movie-list').on('click', '.see-detail', function () { 
//     $.ajax({
//         url: 'http://www.omdbapi.com',
//         type: 'get',
//         dataType: 'json',
//         data: {
//             'apikey': 'fd55cb8a',
//             'i': $(this).data('id')
//         },
//         success: function (movie) {
//             console.log(movie.Title);
//             if (movie.Response === "True") {
//                 $('.modal-body').html(`
//                     <div class="container-fluid">
//                         <div class="row">
//                             <div class="col-md-4">
//                                 <img src="`+movie.Poster+`" class="img-fluid">
//                             </div>

//                             <div class="col-md-8">
//                                 <h3>`+movie.Title+`</h3>

//                                 <ul class="list-group col-md-2">
//                                     <li class="list-group-item">Released : `+movie.Released+`</li>
//                                     <li class="list-group-item">Genre : `+movie.Genre+`</li>
//                                     <li class="list-group-item">Director : `+movie.Director+`</li>
//                                     <li class="list-group-item">Actors : `+movie.Actors+`</li>
//                                 </ul>

//                                 <ul class="list-group col-md-6">
//                                     <li class="list-group-item">`+movie.Released+`</li>
//                                     <li class="list-group-item">`+movie.Genre+`</li>
//                                     <li class="list-group-item">`+movie.Director+`</li>
//                                     <li class="list-group-item">`+movie.Actors+`</li>
//                                 </ul>
//                             </div>
//                         </div>
//                     </div>
//                 `);
//             }
//         }
//     });
// });