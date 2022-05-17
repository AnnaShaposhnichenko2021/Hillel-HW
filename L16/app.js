const requestURL = 'https://api.github.com/users/'
const btn = document.getElementById('btn-add')
const inputLogin = document.getElementById('input-login')
const img = document.getElementById('image-avatar')
const repos = document.getElementById('repos')
const whoFollow = document.getElementById('followers')
const following = document.getElementById('following')
const error = document.getElementById('error')

class User {
  constructor(button, userInput, image, repositories, followers, following, error) {
    this.btn = button;
    this.inputLogin = userInput;
    this.img = image;
    this.repos = repositories;
    this.whoFollow = followers;
    this.following = following;
    this.error = error;
    this.btn.addEventListener('click', this.onClick);
  }

  onClick = () => {
    const login = this.inputLogin.value.trim()
    const userURL = `${requestURL}${login}`
    const userInfo = fetch(userURL)
    this.clearLines()
    userInfo.then((response) => {
      if (response.ok) {
        return response.json()
      }
      throw new Error('Not Found')
  }).then((res) => {
      console.log(res)
      this.imgSrc(res.avatar_url);
      this.publicRepos(res.public_repos);
      this.colFollowers(res.followers);
      this.colFollowing(res.following);
    })
    .catch((err) => {
      this.error.innerHTML = err
    })
  }
  imgSrc = (src) => {
    this.img.src = src;
  }
  publicRepos = (col) => {
    this.repos.innerHTML = col;
  }
  colFollowers = (col) => {
    this.whoFollow.innerHTML = col;
  }
  colFollowing = (col) => {
    this.following.innerHTML = col;
  }
  setErrorMessage = (err) => {
    this.error.innerHTML = err;
  }
  clearLines = () => {
    this.imgSrc('');
    this.publicRepos('');
    this.colFollowers('');
    this.colFollowing('');
    this.setErrorMessage('')
  }

}
new User(btn, inputLogin, img, repos, whoFollow, following, error)