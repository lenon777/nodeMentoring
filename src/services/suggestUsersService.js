const suggestedList = (users, searchVal, limit) => {
    return users
        .filter((user) => {
            return user.login.includes(searchVal);
        })
        .sort((a, b) => {
            return a.login.localeCompare(b.login);
        })
        .slice(0, limit);
};

module.exports = suggestedList;
