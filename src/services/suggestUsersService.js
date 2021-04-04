const suggestedList = (users, searchVal, limit) => {
    return users
        .filter((user) => {
            return user.login.includes(searchVal);
        })
        .sort((a, b) => a.login.localeCompare(b.login))
        .slice(0, limit);
};

module.exports = suggestedList;
