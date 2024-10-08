function tampilkanSemuaMenu() {
    $.getJSON('pizza.json', function(data) {
        let menu = data.menu;
        $.each(menu, function(i, data) {
            // console.log(data.gambar);
            $('#daftarMenu').append('<div class="col-md-4"><div class="card mb-3" style="width: 18rem;"><img src="img/pizza/' + data.gambar + '" class="card-img-top" alt="..."><div class="card-body"><h5 class="card-title">' + data.nama + '</h5><p class="card-text">' + data.deskripsi + '</p><h5 class="card-title">Rp. ' + data.harga + '</h5><a href="#" class="btn btn-primary">Pesan Sekarang</a></div></div></div>')
        });
    });
}
tampilkanSemuaMenu();

$('.nav-link').on('click', function () {
    $('.nav-link').removeClass('active');
    $(this).addClass('active');

    let kategori = $(this).html();
    $('h1').html(kategori);

    if(kategori == 'All Menu') {
        $('#daftarMenu').html('');
        tampilkanSemuaMenu();
        return;
    }

    $.getJSON('pizza.json', function(data) {
        let menu = data.menu;
        let content = '';

        $.each(menu, function(i, data) {
            if (data.kategori == kategori.toLowerCase()) {
                console.log(data.kategori);

                content += '<div class="col-md-4"><div class="card mb-3" style="width: 18rem;"><img src="img/pizza/' + data.gambar + '" class="card-img-top" alt="..."><div class="card-body"><h5 class="card-title">' + data.nama + '</h5><p class="card-text">' + data.deskripsi + '</p><h5 class="card-title">Rp. ' + data.harga + '</h5><a href="#" class="btn btn-primary">Pesan Sekarang</a></div></div></div>';
            }
        });
        $('#daftarMenu').html(content);
    });
    
});