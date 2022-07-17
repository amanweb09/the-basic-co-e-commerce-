

document.getElementById('atc').addEventListener('click', () => addToCart())

const addToCart = async (itemId) => {
    try {
        const { data } = await axios.post('http://localhost:3100/cart', {
            itemId: '629b35b4599bf9d4642c1312', color: 'red', size: 'S'
        })

        console.log(data);

    } catch (err) {
        console.log(err);
    }
}