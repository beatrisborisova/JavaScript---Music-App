import { searchSong } from "../src/api/data.js";
import { html } from "../src/lib.js";

const searchTemplate = (matches, onSearch) => html`
<section id="searchPage">
    <h1>Search by Name</h1>

    <div class="search">
        <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
        <button class="button-list" @click=${onSearch}>Search</button>
    </div>

    <h2>Results:</h2>

    <!--Show after click Search button-->
    <div class="search-result">
        ${matches.length == 0
                ? html`<p class="no-result">No result.</p>`
                : matches.map(matchTemplate)}
    </div>
</section>`

const matchTemplate = (match) => html`
<div class="card-box">
    <img src=${match.imgUrl}>
    <div>
        <div class="text-center">
            <p class="name">Name: ${match.name}</p>
            <p class="artist">Artist: ${match.artist}</p>
            <p class="genre">Genre: ${match.genre}</p>
            <p class="price">Price: $${match.price}</p>
            <p class="date">Release Date: ${match.date}</p>
        </div>
        ${sessionStorage.length == 0
        ? null
    : html`
    <div class="btn-group">
            <a href="/details/${match._id}" id="details">Details</a>
        </div>`}
    </div>
</div>`

export async function searchPage(ctx) {

    const match = ctx.querystring.split('=')[1];
    const matches = match ? await searchSong(match) : [];

    ctx.render(searchTemplate(matches, onSearch));

    function onSearch() {
        const result = document.getElementById('search-input').value;
        if(result) {
            ctx.page.redirect('/search?query=' + result)
        } else {
            return alert('Please fill the search field.')
        }
        
    }

}