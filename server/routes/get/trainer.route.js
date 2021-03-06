/**
 * get user data
 * request:
 *   - token: access token AND
 *   - id: user id OR
 *   - trainer_id: trainer_id
 * response:
 *   - id: the trainer id OR
 *   - userId: the trainer's user id AND
 *   - department: user department
 *   - status: 0 = success, 1 = access denied, 2 = error occurs
 */

import verifier from '../../utils/token-verifier.js'
import { models } from '../../db.js'

const { Trainer } = models

export default (req, res) => {
  
  const { token, id, trainer_id } = req.query

  verifier(token, (valid) => {
    if (!valid) return res.status(200).json({ status: 1 })
    if(id !== undefined)
      Trainer
        .findOne({ where: { userId: id } })
        .then((model) => {
          if (!model) return res.status(200).json({ status: 1 })
          const { id, department } = model
          res.status(200).json({
            status: 0,
            id, department
          })
        })
        .catch((error) => {
          console.log(error)
          return res.status(500).json({ status: 2 })
        })
    else if(trainer_id !== undefined)
      Trainer
        .findOne({ where: { id: id } })
        .then((model) => {
          if (!model) return res.status(200).json({ status: 1 })
          const { userId, department } = model
          res.status(200).json({
            status: 0,
            userId, department
          })
        })
        .catch((error) => {
          console.log(error)
          return res.status(500).json({ status: 2 })
        })
  })

}