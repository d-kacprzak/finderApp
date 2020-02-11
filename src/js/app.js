import { clientID, clientSecret } from './APP_KEY';

$(document).ready(() => {
  $('#button-submit').on('click', function (e) {
    e.preventDefault();
    const searchValue = $('#search').val();

    // request -> Github
    $.ajax({
      url: `https://api.github.com/users/${searchValue}`,
      data: {
        clientID,
        clientSecret,
      },
    }).done((user) => {
        console.log(user)
      $('#result').html(`
        <div class="card mr-2" style="width: 15rem;">
          <img src="${user.avatar_url}" class="card-img-top" alt="${user.avatar_url}">
          <div class="card-body">
            <h5 class="card-title">${user.name}</h5>
            <p class="card-text">${(user.bio) ? user.bio : 'no description'}</p>
          </div>
        
          <div class="card-body">
            <a target="_blank" href="${user.html_url}" class="btn btn-outline-dark btn-block">View Profile</a>
            <a target="_blank" href="${user.blog}" class="btn btn-outline-dark btn-block">Site</a>
          </div>
        </div>
        
        <div class="card col-md-9" style="width: 15rem;">
          <div class="row m-2">
            <span class="badge badge-info m-1 p-1">Public Repos: ${user.public_repos}</span>
            <span class="badge badge-warning m-1 p-1">Public Gist: ${user.public_gists}</span>
            <span class="badge badge-primary m-1 p-1">Followers: ${user.followers}</span>
          </div>  
          
          <ul class="list-group">
            <li class="list-group-item"></li>
            <li class="list-group-item"></li>
            <li class="list-group-item"></li>
          </ul>
        </div>
      `);
    });
  });
});
