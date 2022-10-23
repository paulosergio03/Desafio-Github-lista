import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from '../../components/Card';
import styles from './Profile.module.css';
export function Profile() {
  const { user } = useParams();
  const [listUser, setListUser] = useState({});
  const [repos, setRepos] = useState([]);
  console.log('🚀 ~ file: index.jsx ~ line 7 ~ Profile ~ user', user);
  useEffect(() => {
    const data = async () => {
      await axios
        .get(`https://api.github.com/users/${user}`)
        .then(async (response) => {
          console.log(response);
          setListUser(response.data);

          await axios
            .get(`https://api.github.com/users/${user}/repos`)
            .then((res) => {
              console.log(res.data);
              setRepos(res.data);
            })
            .catch((e) => console.log(e));
        })
        .catch((e) => console.log(e));
    };
    data();
  }, []);
  return (
    <>
      <div className={styles.details}>
        <img src={listUser.avatar_url} alt="" />
        <div className={styles.user}>
          <div className={styles.details_user}>
            <div className={styles.followers_details}>
              <p>{listUser.followers}</p>
              <p>Seguidores</p>
            </div>
            <div className={styles.followers_details}>
              <p>{listUser.following}</p>
              <p>Seguindo</p>
            </div>
            <div className={styles.followers_details}>
              <p>{listUser.public_repos}</p>
              <p>Repositórios</p>
            </div>
          </div>
          <div className={styles.username_details}>
            <h3>{listUser.name}</h3>
            <p>{listUser.bio}</p>
          </div>
        </div>
      </div>
      <div>
        {repos &&
          repos.map((repo) => {
            return (
              <>
                <Card
                  username={repo.full_name}
                  description={repo.description}
                  image={listUser.avatar_url}
                  route={repo.html_url}
                />
              </>
            );
          })}
      </div>
    </>
  );
}
