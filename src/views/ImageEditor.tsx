import { useRef } from 'react';
import styled from 'styled-components';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { COLOR } from 'constants/COLOR';
import { Row } from 'components/layouts';
import { IconTypeButton } from 'components/atom';
import { ReactComponent as Rotate } from 'assets/chats/ic_rotate.svg';
import { ReactComponent as Done } from 'assets/chats/btn_done.svg';

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background: ${COLOR.BLACK};
  .cropper-wrap-box {
    background: ${COLOR.BLACK};
  }
  .cropper-modal {
    background: ${COLOR.BLACK};
  }
`;

const CropperWrapper = styled.div`
  width: 100%;
  height: calc(100% - 50px);
`;

const ButtonWrapper = styled(Row)`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 50px;
  padding: 0 30px;
  > div {
    gap: 20px;
  }
`;

export default function ImageEditor() {
  const dummy = '/images/chats/image_ex.png';
  const ref = useRef<any>(null);

  const handleCrop = (e) => {
    console.log(e);
  };
  const handleRotate = () => {
    ref.current.cropper.rotate(90);
  };
  return (
    <Wrapper>
      <CropperWrapper>
        <Cropper
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
          }}
          ref={ref}
          src={dummy}
          initialAspectRatio={1}
          responsive={false}
          cropend={handleCrop}
        />
      </CropperWrapper>
      <ButtonWrapper justify="space-between">
        <IconTypeButton size={25}>
          <Rotate />
        </IconTypeButton>
        <Row>
          <IconTypeButton size={25} onClick={handleRotate}>
            <Rotate />
          </IconTypeButton>

          <IconTypeButton size={47}>
            <Done />
          </IconTypeButton>
        </Row>
      </ButtonWrapper>
    </Wrapper>
  );
}
