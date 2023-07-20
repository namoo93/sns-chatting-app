import React, { useState } from 'react';
import { Avatar, Button, ButtonVariant, Icon } from 'components/atom';
import { TitleHeader } from 'components/molecules';
import styled from 'styled-components';
import { COLOR } from 'constants/COLOR';
import { useAtomValue } from 'jotai';
import userAtom from 'stores/userAtom';
import { post } from 'net/rest/api';
import { uploadS3 } from 'lib/uploadS3';
import { toast } from 'react-toastify';
import TagFriend from './components/userTag/TagFriend';
import { useTranslation } from 'react-i18next';

const Container = styled.div``;
const TagFriends = styled.div`
  border-bottom: 1px solid #eee;
  padding: 20px 20px 13px;
  display: flex;
  align-items: flex-start;

  .tags_wrap {
    margin-left: 12px;
    display: flex;
    flex-direction: column;
  }
  .user_name {
    font-size: 18px;
    font-weight: 500;
    color: ${COLOR.BLACK};
    padding-bottom: 3px;
  }
  .user_tag {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;

    .tag_add_button {
      display: inline-block;
      font-size: 12px;
      line-height: 15px;
      height: 22px;
      color: #ccc;
      border: 1px solid #ccc;
      padding: 3px 8px 2px;
      border-radius: 22px;
      margin-bottom: 5px;
    }
    .tag {
      display: inline-block;
      color: ${COLOR.BLACK};
      height: 22px;
      padding: 3px 8px 2px;
      border-radius: 22px;
      font-size: 15px;
      background-color: #ededed;
      margin-left: 5px;
      margin-bottom: 5px;

      img {
        display: inline-block;
        margin-left: 5px;
      }
    }
  }
`;
const CameraAdd = styled.div`
  border-bottom: 1px solid #eee;
  padding: 20px 20px 15px;
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;

  .camera_add_button {
    flex: 0 0 48px;
    height: 48px;
    border: 1px solid ${COLOR.BLACK};
    border-radius: 6px;
    display: flex;
    padding: 6px;
    align-items: center;
    flex-direction: column;

    .camera_add_index {
      font-size: 11px;
      color: ${COLOR.BLACK};
      padding-top: 5px;
    }
  }
  .picture {
    flex: 0 0 48px;
    position: relative;
    margin-left: 10px;

    .picture_wrap {
      display: inline-block;
      width: 100%;
      height: 48px;
      border-radius: 6px;
      border: solid 1px #ededed;
      overflow: hidden;
    }

    .picture_close {
      position: absolute;
      top: -3px;
      right: -3px;
    }
  }
  .camera_input {
    display: none;
  }

  .camera_img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;
const LocationAdd = styled.button`
  border-bottom: 1px solid #eee;
  padding: 20px 20px 18px;
  display: flex;
  width: 100%;
  align-items: center;

  span {
    padding-left: 5px;
    font-size: 15px;
    color: #bbb;
  }
  span.on {
    color: ${COLOR.PRIMARY};
  }
`;
const Textbox = styled.div`
  padding: 20px;

  textarea {
    width: 100%;
    height: inherit;
    resize: none;
    min-height: 200px;

    &::placeholder {
      font-size: 14px;
      color: #bbb;
    }
    &:focus {
      outline: none;
    }
  }
`;

export type tagFriendType = {
  uid: string;
  id: number;
};
const KokKokMePost = () => {
  const { t } = useTranslation();
  const [tags, setTags] = useState<tagFriendType[]>([]);

  //layout 바꾸는 flag
  const [layout, setLayout] = useState(true);

  const [location] = useState('');
  const [content, setContent] = useState<string>();
  const [pictures, setPictures] = useState<string[]>([]);

  const user = useAtomValue(userAtom);

  //write / done 버튼
  const onhandleClick = async () => {
    if (layout) {
      //write
      const res = await post(
        '/socials/posts',
        {
          type: 'post',
          contents: content,
          image: pictures,
          taged_user_ids: tags.map((t) => {
            return t.id;
          }),
        },
        null,
        (error) => {
          //Todo_lang (누락)
          toast(`${t('sns.Post Failed')}`, { type: 'error' });
        },
      );
      if (res) window.close();
    } else {
      //done
      setLayout(true);
    }
  };

  //이미지 업로드
  async function uploadImage(e: any) {
    if (!e.target.files[0]) return;
    const res = await uploadS3(e.target.files[0]);
    if (res.location) {
      setPictures((p) => [...p, res.location]);
    } else {
      //Todo_lang (누락)
      toast(`${t('sns.Image Upload Failed')}`, { type: 'error' });
    }
  }

  return (
    <Container>
      <TitleHeader
        title={`${t('sns.New Post')}`}
        button={[
          <Button
            className={'string'}
            type={'button'}
            onClick={() => onhandleClick()}
            fontSize={14}
            variant={ButtonVariant.Text}
          >
            {layout ? `${t('sns.Write')}` : `${t('sns.Done')}`}
          </Button>,
        ]}
        buttonRight={'20px'}
      />
      {layout ? (
        <>
          <TagFriends>
            <Avatar size={40} src={user?.profile_image} />
            <div className="tags_wrap">
              <p className="user_name">
                {user?.first_name} {user?.last_name}
              </p>
              <p className="user_tag">
                <button className="tag_add_button" onClick={() => setLayout(false)}>
                  + {t('sns.Tag Friends')}
                </button>

                {tags.map((tag, index) => (
                  <button key={index} className="tag" onClick={() => setTags((f) => f.filter((t) => t.id !== tag.id))}>
                    {tag.uid}
                    <Icon size={10} src={'/images/icon/ic-close-16.svg'} />
                  </button>
                ))}
              </p>
            </div>
          </TagFriends>
          <CameraAdd>
            <label className="camera_add_button" htmlFor="input-file">
              <Icon size={17} src={'/images/ic-camera.svg'} />
              <span className="camera_add_index">{pictures.length}/30</span>
            </label>
            <input
              type="file"
              id="input-file"
              className="camera_input"
              accept="image/png, image/gif, image/jpeg, video/mp4"
              onChange={(e) => uploadImage(e)}
            />

            {pictures.map((picture, index) => (
              <button key={index} className="picture">
                <span className="picture_wrap">
                  <img src={picture} className="camera_img" alt="" />
                </span>
                <Icon
                  size={16}
                  src={'/images/ic-close-round-16.svg'}
                  className="picture_close"
                  onClick={() => {
                    setPictures((p) => p.filter((pic, i) => i !== index));
                  }}
                />
              </button>
            ))}
          </CameraAdd>
          <LocationAdd>
            <Icon size={22} src={'/images/ic-location-22.svg'} />
            {location === '' ? <span>Add location</span> : <span className="on">{location}</span>}
          </LocationAdd>
          <Textbox>
            {/* //Todo_lang (누락) */}
            <textarea
              placeholder={`${t('sns.Enter what you are thinking')}`}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            {location && <div className="location_box"> </div>}
          </Textbox>
        </>
      ) : (
        <TagFriend tags={tags} onChange={(t) => setTags(t)} />
      )}
    </Container>
  );
};

export default KokKokMePost;
