import { getAllSongs } from "../src/api/data.js";
import { html } from "../src/lib.js";

const catalogTemplate = (songs) => html`
<section id="catalogPage">
    <h1>All Albums</h1>

    ${songs.length == 0
    ? html`<p>No Albums in Catalog!</p>`
    : songs.map(songTemplate)
        }

</section>`

const songTemplate = (song) => html`
<div class="card-box">
    <img src=${song.imgUrl}>
    <div>
        <div class="text-center">
            <p class="name">Name: ${song.name}</p>
            <p class="artist">Artist: ${song.artist}</p>
            <p class="genre">Genre: ${song.genre}</p>
            <p class="price">Price: $${song.price}</p>
            <p class="date">Release Date: ${song.releaseDate}1</p>
        </div>
        ${sessionStorage.length == 0
        ? null
    : html`
    <div class="btn-group">
            <a href="/details/${song._id}" id="details">Details</a>
        </div>`}
    </div>
</div>`


export async function catalogPage(ctx) {
    const songs = await getAllSongs();
    ctx.render(catalogTemplate(songs));
}