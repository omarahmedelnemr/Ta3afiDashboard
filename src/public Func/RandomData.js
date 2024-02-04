function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  function getRandomDate() {
    const currentDate = new Date();
    const randomPastDays = getRandomNumber(1, 30);
    currentDate.setDate(currentDate.getDate() - randomPastDays);
    return currentDate.toISOString();
  }
  
  function generateRandomPost() {
    const randomId = getRandomNumber(100, 999);
    const randomDate = getRandomDate();
  
    const post = {
      id: randomId,
      date: randomDate,
      views: getRandomNumber(0, 100),
      edited: getRandomNumber(0, 1),
      mainText: "Random Text " + randomId,
      hideIdentity: getRandomNumber(0, 1),
      community: "Community "+getRandomNumber(1, 5),
      userName: "RandomUser" + randomId,
      userProfileImage: "default.png",
      patientID:getRandomNumber(1,5),
      images: [],
      commentsNumber: getRandomNumber(0, 20),
      reactions: [
        {
          reaction: "love",
          count: getRandomNumber(0, 10).toString(),
        },
        {
          reaction: "care",
          count: getRandomNumber(0, 10).toString(),
        },
      ],
    };
  
    // Add images randomly
    if (getRandomNumber(0, 1) === 1) {

        var amount = getRandomNumber(1,5)
        for (var i=0;i<amount;i++){

            const randomImageId = getRandomNumber(1, 6);
            const image = {
                id: randomImageId,
                name: "RandomImage" + randomImageId,
                link: "image" + randomImageId + ".jpg",
            };
            post.images.push(image);
            }
    }
  
    return post;
  }
  
  function randomizeData(limit){
    const randomPosts = Array.from({ length: limit }, generateRandomPost);
    return randomPosts
  }
export default randomizeData;