import { deleteSong, getSongById } from "../src/api/data.js";
import { html } from "../src/lib.js";
import { getUserData } from "../src/utils.js";

const detailsPage = (song, isOwner, onDelete) => html`
<section id="detailsPage">
    <div class="wrapper">
        <div class="albumCover">
            <img src=${song.imgUrl}>
        </div>
        <div class="albumInfo">
            <div class="albumText">

                <h1>Name: ${song.name}</h1>
                <h3>Artist: ${song.artidt}</h3>
                <h4>Genre: ${song.genre}</h4>
                <h4>Price: $${song.price}</h4>
                <h4>Date: ${song.releaseDate}</h4>
                <p>Description: ${song.description}</p>
            </div>

            ${isOwner
            ? html`<div class="actionBtn">
                <a href="/edit/${song._id}" class="edit">Edit</a>
                <a href="javascript:void(0)" class="remove" @click=${onDelete}>Delete</a>
            </div>`
            : null}

        </div>
    </div>
</section>`

export async function detaisPage(ctx) {

    const song = await getSongById(ctx.params.id);
    const userData = await getUserData();
    let isOwner = false;

    if (userData) {
        isOwner = song._ownerId && song._ownerId == userData.id
    }

    ctx.render(detailsPage(song, isOwner, onDelete))

    async function onDelete() {

        const confirmation = confirm('Are you sure you want to delete this song?');
        if (confirmation) {
            await deleteSong(song._id);
            ctx.page.redirect('/catalog');
        }
    }
}