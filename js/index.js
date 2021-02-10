const form = document.querySelector('form');
const ethValue = document.querySelector(".eth-value");
const formInput = document.querySelector('form input');
const d4ppBuy = document.querySelector('.d4pp-token-buy');
const presalePriceInput = document.querySelector('.presale-price-per-eth');


// Enter admin's wallet in the field below
const adminWallet = "";

const TokenAddress = "0xcecc44fee8f0d4d2e5b958abe176b3781cc8f2e5";
const presalePrice = 1400;

let web3;
let user;

const toWei = _amount => web3.utils.toWei(_amount.toString(), 'ether');

window.addEventListener('DOMContentLoaded', async () => {
    await loadWeb3();
})

const loadWeb3 = async () => {
    try {
        await ethereum.enable();

        if(!ethereum) return alert("Non-Ethereum browser detected. You should consider trying Metamask");
        web3 = new Web3(ethereum);
        // Get Network / chainId
        const _chainId = await ethereum.request({ method: 'eth_chainId' });
        if(parseInt(_chainId, 16) !== 1) return alert("Connect wallet to a main network");

        const _accounts = await ethereum.request({ method: 'eth_accounts' });
        [user] = _accounts;
        presalePriceInput.textContent = `${presalePrice} GASIFY`;

    } catch (error) {
        console.log(error.message);
        return error.message;
    }       
}

formInput.addEventListener('change', e => {
    e.preventDefault();
    const input = e.currentTarget.value;
    console.log(input)
    if(isNaN(input)) return;

    const calcD4PPToken = Number(input) * presalePrice;

    ethValue.textContent = `${Number(input).toFixed(2)} ETH`;
    d4ppBuy.textContent = `${calcD4PPToken.toFixed(2)} D4PP`;
    
})

form.addEventListener('submit', async e => {
    e.preventDefault();
    try {
        const input = e.target.elements[0].value;
        if(isNaN(input)) return;
        const transactionObject = {
            from: user,
            to: adminWallet,
            value: toWei(input)
        }
        await web3.eth.sendTransaction(transactionObject);
        return alert("Transaction successful");
    } catch (error) {
        alert("Error while trying to process transaction");
        return error.message;
    }
})