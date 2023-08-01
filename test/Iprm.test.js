const Iprm = artifacts.require("Iprm");

require('chai')
	.use(require('chai-as-promised'))
	.should()

contract('Iprm',(accounts)=>{
	let iprm

	before(async()=>{
		iprm=await Iprm.deployed()
	})

	describe('deployment',async()=>{
		it('deploys successfully',async()=>{
		const address=iprm.address
		assert.notEqual(address,0x0)
		assert.notEqual(address,'')
		assert.notEqual(address,undefined)
		assert.notEqual(address,null)
		// console.log(address)
		})
	
	})

	describe('storage',async()=>{
		it('updates the storage',async()=>{
			let hash
			hash='abc123'
			await iprm.set(hash)
			const result=await iprm.get()
			assert.equal(result,hash)
			// console.log(result)
		})
	})
})