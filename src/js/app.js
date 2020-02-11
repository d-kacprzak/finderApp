import { clientID, clientSecret } from './APP_KEY';

$(document).ready(() => {
  const desc = ' No description';

  $('#button-submit').on('click', (e) => {
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
      $.ajax({
        url: `https://api.github.com/users/${searchValue}/repos`,
        data: {
          clientID,
          clientSecret,
          sort: 'created asc',
          per_page: 10,
        },
      }).done((repos) => {
        $.each(repos, (index, val) => {
          $('#repos').append(`
            <div class="card  mb-2 p-2">
                <div class="row col-12">
                    <div>
                        <strong>${val.name}</strong>
                        <span class="badge badge-info m-1 p-1">Forks: ${val.forks_count}</span>
                        <span class="badge badge-warning m-1 p-1">Watchers: ${val.watchers_count}</span>
                        <span class="badge badge-primary m-1 p-1">Stars: ${val.stargazers_count}</span>
                        <span class="badge badge-danger m-1 p-1">language: ${val.language}</span>
                        <br>
                        
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-9">
                        ${(val.description) ? val.description : desc}
                    </div>
                    <div class="col-md-3 h-25">
                        <a target="_blank" class="btn btn-outline-info" href="${val.html_url}">View Repo</a>
                     </div>
                </div>
                
            </div>
        
              `);
        });
      });
      $('#result').html(`
        <div class="card mr-2 mb-2 h-100" style="width: 15rem;">
          <img src="${user.avatar_url}" class="card-img-top" alt="${user.avatar_url}">
          <div class="card-body">
            <h5 class="card-title">${user.name}</h5>
            <p class="card-text">${(user.bio) ? user.bio : desc}</p>
          </div>
        
          <div class="card-body">
            <a target="_blank" href="${user.html_url}" class="btn btn-outline-dark btn-block">View Profile</a>
            <a target="_blank" href="${user.blog}" class="btn btn-outline-dark btn-block">Site</a>
          </div>
        </div>
        
        <div class="card col-md-9" style="width: 15rem;">
          <div class="row m-2">
            <span class="badge badge-info m-1 p-2">Public Repos: ${user.public_repos}</span>
            <span class="badge badge-warning m-1 p-2">Public Gist: ${user.public_gists}</span>
            <span class="badge badge-primary m-1 p-2">Followers: ${user.followers}</span>
          </div>  
          
          <ul class="list-group">
            <li class="list-group-item">Company: ${(user.company) ? user.company : desc}</li>
            <li class="list-group-item">Location: ${(user.location) ? user.location : desc}</li>
            <li class="list-group-item">Member Since: ${(user.created_at) ? user.created_at : desc}</li>
          </ul>
          <h5 class="page-header mt-3">Latest Repos:</h5>
          <div id="repos"></div>
        </div>
      
      `);
        ($('#footer').empty()) ? $('#footer').append(`
        <!-- Copyright -->
        <div class="footer footer-copyright text-center py-3">© 2020 Copyright:
            <a href="#"> Damian Kacprzak</a>
        </div>
        <!-- Copyright -->
      `) : null;
    });
  });
});
