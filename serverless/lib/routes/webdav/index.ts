import express from 'express'
const router = express.Router();

router.put('/:filePath', express.raw({ type: 'application/pdf', limit: '1gb'}), (req, res)=>{

	const uploadBuf = req.body;
	console.log(req.body)
	res.status(200).send()
})

export = router
