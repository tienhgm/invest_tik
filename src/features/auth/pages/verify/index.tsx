import React, { useEffect } from 'react';
import { Loading } from 'components/Common';
import authApi from 'apis/auth';
import queryString from 'query-string';
import { VerifyPayload } from 'model';
import { useHistory, useLocation } from 'react-router-dom';
function Verify() {
  const location = useLocation();
  const history = useHistory();
  const onVerify = async () => {
    const { expires, signature } = queryString.parse(location.search);
    let pathSplit = location.pathname.split('/');
    const id = pathSplit[pathSplit.length - 2];
    const hash = pathSplit[pathSplit.length - 1];
    const payload: VerifyPayload = { id, hash, expires, signature };
    try {
      await authApi.verifyEmailAfterRegister(payload);
      localStorage.setItem('verify', 'true');
      history.push('/login');
    } catch (error) {
      history.push('/login');
    }
  };
  useEffect(() => {
    onVerify();
  }, []);

  return <Loading />;
}

export default Verify;
