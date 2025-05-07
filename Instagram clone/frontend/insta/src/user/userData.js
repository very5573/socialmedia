const generateUsersData = () => {
  const users = {};
  
  for (let i = 1; i <= 10; i++) {  // 10 users ke liye loop chala rahe hain
    const userId = `uid${i}`;
    users[userId] = {
      email: `user${i}@gmail.com`,
      username: `user${i}`,
      profileImage: `url${i}`,
      reels: [{ url: `reelUrl${i}`, caption: `Reel caption ${i}` }],
      posts: [
        {
          url: `postUrl${i}`,
          caption: `Post caption ${i}`,
          likes: [`uid${i % 10 + 1}`, `uid${(i + 1) % 10 + 1}`], // Random likes
          comments: [
            { userId: `uid${(i + 2) % 10 + 1}`, comment: "Nice post!" },
            { userId: `uid${(i + 3) % 10 + 1}`, comment: "Great photo!" }
          ],
          likesCount: 2,
          commentsCount: 2
        }
      ],
      followers: [`uid${(i + 1) % 10 + 1}`],
      following: [`uid${(i + 2) % 10 + 1}`],
      notifications: [
        `User uid${(i + 1) % 10 + 1} liked your post.`,
        `User uid${(i + 2) % 10 + 1} commented on your post.`
      ]
    };
  }
  
  return users;
};

// Generate the data for 10 users
const usersData = generateUsersData();

// Export the data so that it can be imported in other files
export default usersData;
