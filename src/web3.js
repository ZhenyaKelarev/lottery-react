import Web3 from "web3"

window.ethereum.request({ method: "eth_requestAccounts" })

const web3 = new Web3(window.ethereum)

export default web3

// export const connectHandler = async () => {
// 	try {
// 		const accounts = await window.ethereum.request({
// 			method: "eth_requestAccounts",
// 		});
// 		console.log(accounts);
// 	} catch (error) {
// 	console.log(error);
//  }
// };
