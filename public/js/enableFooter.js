function enableFooter(is_footer_enabled)
{
    const footer = document.getElementById("footer");
    if(is_footer_enabled)
    {
        footer.innerHTML= `
            <div class="mt-5 container" style="padding:0px;">
                <img src="images/footer_banner.png" alt="uvodny obrázok" style="width:100%;border-radius:25px 25px 0px 0px;">
                <div class="text-center bg-feit-orange text-white py-3" style="border-radius:0px 0px 25px 25px;">© 2024 Uniza Academy. Všetky práva vyhradené.</div>
            </div>
        `;
    }
    else
    {
        footer.innerHTML= "";
    }
}