const shuffle = (arr) => {
    var len, j, temp;

    len = arr.length;

    for (let i = len - 1; i > 0; i -= 1) {
        j = Math.floor(Math.random() * (i + 1));

        temp = arr[j];
        arr[j] = arr[i];
        arr[i] = temp;
    }

    return arr;
};

export default shuffle;
