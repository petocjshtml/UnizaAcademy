function showAboutUsPage()
{
    const page_info = document.getElementById("page-info");
    const root = document.getElementById("root");
    page_info.innerHTML="Kontaktné info";
    root.innerHTML=`
    <div class="container mt-5 card">
    <h1 class="display-5 fw-bold mb-5 text-center">Skupina administrátorov</h1>
    <table class="table table-hover table-transparent text-center">
        <thead>
        <tr>
            <th scope="col">#</th>
            <th scope="col">Hlavný administrátor</th>
            <th scope="col">Tel. číslo</th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <th scope="row">1</th>
            <td>Ing. Uhrina Miroslav, PhD.</td>
            <td>+421 41 513 2253</td>
        </tr>
        </tbody>
        <thead>
        <tr>
            <th scope="col">#</th>
            <th scope="col">Ďalší pracovníci stránky</th>
            <th scope="col">E-mail</th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <th scope="row">1</th>
            <td>Ing. Radilová Martina, PhD.</td>
            <td>martina.radilova@fel.uniza.sk</td>
        </tr>
        <tr>
            <th scope="row">2</th>
            <td>doc. Ing. Počta Peter, PhD.</td>
            <td>peter.pocta@fel.uniza.sk</td>
        </tr>
        <tr>
            <th scope="row">3</th>
            <td>doc. Ing. Vaculík Martin, PhD.</td>
            <td>martin.vaculik@fel.uniza.sk</td>
        </tr>
        </tbody>
    </table>
    </div>

    <div class="container mt-5 card">
        <h1 class="display-5 fw-bold mb-5 text-center">Mapa Žilinskej Univerzity</h1>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2606.8577632802053!2d18.752670976217956!3d49.20325777138102!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471459482d177287%3A0x278378d8bd875274!2zxb1pbGluc2vDoSB1bml2ZXJ6aXRhIHYgxb1pbGluZQ!5e0!3m2!1ssk!2ssk!4v1728134492124!5m2!1ssk!2ssk"  style="border:0;width:100%;height:500px" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>
    `;
    closeMenu();
    enableFooter(true);
}