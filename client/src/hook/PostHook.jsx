import { useEffect, useState } from 'react';
import axios from 'axios';

const PostHook = (url, postData) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const sendData = async () => {
      setLoading(true);
      try {
        const response = await axios.post(url, postData);
        console.log(response);
        if (response) {
          setData(response.data);
        } else {
          return null;
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (postData) {
      sendData();
    }
  }, [url, postData]);

  return { data, loading, error };
};

export default PostHook;
