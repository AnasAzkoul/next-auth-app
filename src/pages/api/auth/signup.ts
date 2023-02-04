import {NextApiRequest, NextApiResponse} from 'next';
import {string, z} from 'zod'
import {prisma} from '../../../lib/prismaDB';
import { hash } from 'bcryptjs';

const newUserSchema = z.object({
  username: string().min(3), 
  email: string().email(), 
  password: string().min(5)
})

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const {username, email, password} = req.body; 
    
    const result = newUserSchema.safeParse({username, email, password}); 
    
    if (!result.success) {
      res.status(422).json('Invalid inputs'); 
      return; 
    }
    
    const user = await prisma.user.findUnique({where: {email}}); 
    
    if (user) {
      res.status(422).json({message: `a user already exists with this email address ${email}`}); 
    }
    
    const hashedPassword = await hash(password, 12); 
  
    try {
      await prisma.user.create({data: {username, email, password: hashedPassword}}); 
    } catch (error) {
      console.log(error)
    }
    
    res.status(201).json({message: 'success', newUser: {username, email}}); 
    return; 
  } 
  
  res.status(200).json('it is working'); 
}


export default handler; 
