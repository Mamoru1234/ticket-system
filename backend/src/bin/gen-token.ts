import { TokenUtils } from '../utils/TokenUtils';
import { TokenData } from '../constants/token-data.type';

async function genToken() {
  const email = process.argv[2];
  if (!email) {
    throw new Error('Please provide email');
  }
  const data: TokenData = {
    email,
  };
  const token = await TokenUtils.sign(data, {
    algorithm: 'HS512',
  });
  console.log(token);
  const tokenData = await TokenUtils.verify(token);
  console.log(tokenData.email);
}

genToken().catch((e) => {
  console.log('Error in gen');
  console.log(e);
})
