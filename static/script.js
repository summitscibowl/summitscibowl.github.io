if (document.URL.substring(0, 36) === 'https://summitscibowl.herokuapp.com/') {
    window.location.href = 'http://www.summitscibowl.com' + document.URL.substring(36);
}