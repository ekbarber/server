import express from 'express'
import FileController from '../../controller/FileController';
const router = express.Router();

router.put('/:filePath', express.raw({ type: 'application/pdf', limit: '1gb'}), async (req, res)=>{

	const uploadBuf = req.body;
	const file = await FileController.createNewFile('test.pdf', uploadBuf)
	res.status(200).send()
})

export = router
