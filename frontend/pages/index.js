import Head from 'next/head';
import { useState, useEffect, useRef } from 'react';
import Modal from './Modal';
import Image from 'next/image';
import gsap from 'gsap';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const textRef = useRef(null);
  const imagelist1 = useRef(null);
  const imagelist2 = useRef(null);
  const imagelist3 = useRef(null);
  const headline = useRef(null);



useEffect (() => {
  const letters = textRef.current.querySelectorAll("span");
  gsap.to(letters, {
      duration: 1,
      opacity: 0.1,
      stagger: 0.1,
      ease: "power3.out",
  });
    
}, []);

//make it fade too and out
useEffect (() => {
  let fromTween = gsap.to(imagelist1.current, {
    y: -100,
    x: 50,
    duration: 5,
    ease: "power3.out"});
    
  let toTween = gsap.to(imagelist2.current, {
    opacity: 1,
    y: 100,
    x: 100,
    duration: 5,
    ease: "power3.out"});

  let toTween2 = gsap.from(imagelist3.current, {
    opacity: 0,
    y: 200,
    x: -500,
    duration: 5,
    ease: "power3.out"});


    return () => {
      fromTween.revert();
      toTween.revert();
      toTween2.revert();
    }
}, []);





// let imgArray = gsap.utils.toArray('.imgright');

// useEffect (() => {
//   tl.to(imgArray, {
//     duration: 1,
//     opacity: 0.1,
//     stagger: 0.1,
//     ease: "power3.out",
//   });
// }, [imgArray]);




  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Welcome to Arturs Test Page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head> 
      <main>
        <div className='mainwrapper'>
        <div className='mainleft'>
        <h1 className="headline"> Unwind and relax</h1>
        <Image
          className='imgleft'
          src="/spinner.svg"
          alt="pic1" 
          width={150} 
          height={140} 
          />
        </div>
        <div className='mainright'>
          <Image 
          className='imgright'
          src="https://res.cloudinary.com/dyvgcv5se/image/upload/v1673306789/massage/AdobeStock_66993208.jpg" 
          alt="pic1" 
          width={500} 
          height={334} 
          ref = {imagelist1}
          />
          <Image 
          className='imgright'
          src="https://res.cloudinary.com/dyvgcv5se/image/upload/v1673306785/massage/AdobeStock_57313153_1.jpg" 
          alt="pic2" 
          width={500} 
          height={334} 
          ref = {imagelist2}
          />
          <Image
          className='imgright'
          src="https://res.cloudinary.com/dyvgcv5se/image/upload/v1673306790/massage/AdobeStock_91121344.jpg"
          alt="pic3"
          width={500}
          height={334} 
          ref = {imagelist3}
          />
          <div className='social'>
            <div className='skewtxt'>FB</div>
            <div className='skewtxt'>IG</div>
            <div className='skewtxt'>TW</div>
          </div>
        </div>
      <div className="lotus" ref={textRef}>
        <span>L</span>
        <span>O</span>
        <span>T</span>
        <span>U</span>
        <span>S</span>
      </div>
      </div>
    {/* <button onClick={() => setIsModalOpen(true)}>Open Modal</button> */}
      <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
      <Image
        className='button-close'
        src="/closeicon.svg"
        alt="Picture of the author"
        width={18}
        height={18}
        onClick={() => setIsModalOpen(false)}
      />
      </Modal>
      <div className='divcrazy'></div>

      </main>
    </>
  );
}