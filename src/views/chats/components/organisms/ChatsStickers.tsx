import React from 'react';
// import styled from 'styled-components';
// import { Mojitok, MJTMainView, MJTRTSView } from '@mojitok/mojitok-uikit';
// (window as any).global = window;
// @ts-ignore
// window.Buffer = window.Buffer || require('buffer').Buffer;

type Props = {
  setStickerUrl?: (url: string) => void;
};
// const Wrapper = styled.div`
//   padding: 10px;
//   height: 260px;
//   .reactGiphySearchbox-searchForm-input {
//     border: none;
//     border-bottom: 1px solid #ededed;
//     font-size: 14px;
//   }
//   > div > div {
//     &::-webkit-scrollbar {
//       display: none;
//     }
//   }
// `;

export default function ChatsStickers({ setStickerUrl }: Props) {
  return <></>;
  // Mojitok.setup('0A9AB47A-A70C-4611-A75A-022BCFCCF88A');
  // //@ts-ignore
  // Mojitok.setPaymentPlatform('EXIMBAY');
  // Mojitok.setStoreGeometry(0, 0, 360, 650);
  // Mojitok.setMainColor('#3278FF');
  // Mojitok.setUILang('en');
  // Mojitok.login('zw6fnaXaTdNut2ck1xR12cHIgOJV8Hqc', 'test2', e => {
  //   if (e == null) {
  //     // 3-a. on Success
  //   } else {
  //     // 3-b. on Fail: If the e.code value is 4001, then please check the applicationId or the applicationToken
  //   }
  // });
  //
  // return (
  //   <Wrapper>
  //     <MJTMainView
  //       width={400}
  //       height={300}
  //       //@ts-ignore
  //       onStickerChoice={(item: { url: string }) => {
  //         setStickerUrl?.(item?.url);
  //       }}
  //     />
  //   </Wrapper>
  // );
}
