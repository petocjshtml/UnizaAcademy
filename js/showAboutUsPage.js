function showAboutUsPage()
{
    const page_info = document.getElementById("page-info");
    const root = document.getElementById("root");
    page_info.innerHTML="Kontaktné info";
    root.innerHTML=`
    <div class="container mt-5 card">
        <table class="table table-hover table-dark table-bordered text-center">
            <thead class="thead-light">
            <tr>
                <th scope="col">#</th>
                <th scope="col">Hlavný administrátor</th>
                <th scope="col">Tel.číslo</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <th scope="row">1</th>
                <td>Ing. Uhrina Miroslav, PhD.</td>
                <td>+421 41 513 2253</td>
            </tr>
            </tbody>
            <thead class="thead-light">
            <tr>
                <th scope="col">#</th>
                <th scope="col">Pracovník stránky</th>
                <th scope="col">E-mail</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <th scope="row">1</th>
                <td>Ing. Uhrina Miroslav, PhD.</td>
                <td>miroslav.uhrina@fel.uniza.sk</td>
            </tr>
            <tr>
                <th scope="row">2</th>
                <td>Ing. Radilová Martina, PhD.</td>
                <td>martina.radilova@fel.uniza.sk</td>
            </tr>
            <tr>
                <th scope="row">3</th>
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
    `;
    closeMenu();
}