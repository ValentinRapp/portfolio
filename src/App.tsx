import { useEffect, useRef, useState } from 'react'
import './App.css'
import './windows.css'
import 'winbox/dist/css/winbox.min.css'; // required
import 'winbox/dist/css/themes/modern.min.css'; // optional
import WinBox from 'react-winbox';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ScrollButton } from './scrollButton';
import { Windows, WindowsProps as IDs} from './types';
import { openFile } from './openFile';

const mobile = (): boolean => {
  const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
  return /android|iphone|ipad|ipod|blackberry|windows phone/i.test(userAgent);
}

const stringToHash = (str: string): number => {
  let hash = 0;
  let char: number;

  if (str.length == 0) return hash;

  for (let i = 0; i < str.length; i++) {
    char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }

  return hash;
}

function ContactMe(props: {id: string}): JSX.Element {
  return (
    <div id={props.id}>
      <h2>Contact me<span className='cursor'>|</span></h2>
      <a href='mailto: valentin.rapp@epitech.eu' target='_blank'>valentin.rapp@epitech.eu</a>
      <br/>
      <a href='https://www.linkedin.com/in/valentin-rapp-07465423b/' target='_blank'>Linkedin</a>
      <br/>
      <a href='https://github.com/ValentinRapp' target='_blank'>Github</a>
      <p style={{margin: '0%'}}>Phone: +33 6 22 98 28 44</p>
    </div>
  );
}

function AboutMe(props: {id: string}): JSX.Element {
  return (
    <div id={props.id}>
      <h2>About me<span className='cursor'>|</span></h2>
      <p>Hi! I'm Valentin Rapp, a computer science student from France pursuing a master's degree in software engineering. I'm passionate about maths and programming in general, more specifically anything related to graphics programming. I like to understand deeply how things work so I often work with low level languages to get a better grasp of comp-sci concepts I didn't know before. I've been passionate about computers since I was young and I'm always eager to learn more!</p>
      <p>I am currently looking for a part-time internship from September to February 2024 in anything regarding tech.</p>
    </div>
  );
}

function Raytracer(props: {id: string, raytracerText: string}): JSX.Element {
  return (
    <div id={props.id}>
      <h1>Raytracer<span className='cursor'>|</span></h1>
      <Markdown className='md' remarkPlugins={[remarkGfm]}>{props.raytracerText}</Markdown>
    </div>
  );
}

function Myteams(props: {id: string, myteamsText1: string, myteamsText2: string, myteamsText3: string, myteamsText4: string}): JSX.Element {
  return (
    <div id={props.id}>
      <h1>Myteams<span className='cursor'>|</span></h1>
      <Markdown className='md' remarkPlugins={[remarkGfm]}>{props.myteamsText1}</Markdown>
      <video width="100%" height="auto" controls>
        <source src="https://github.com/user-attachments/assets/daa4f134-dcc8-468e-8ff7-185b17a04c80" type="video/mp4" />
        <p style={{color: 'red'}}>Video playback is unavailable on this browser.</p>
      </video>
      <Markdown className='md' remarkPlugins={[remarkGfm]}>{props.myteamsText2}</Markdown>
      <video width="100%" height="auto" controls>
        <source src="https://github.com/user-attachments/assets/d1b1bd8d-7e14-45b7-956c-db5517992cbe" type="video/mp4" />
        <p style={{color: 'red'}}>Video playback is unavailable on this browser.</p>
      </video>
      <Markdown className='md' remarkPlugins={[remarkGfm]}>{props.myteamsText3}</Markdown>
      <video width="100%" height="auto" controls>
        <source src="https://github.com/user-attachments/assets/5b39a649-afa1-49eb-bafe-5072adc91c03" type="video/mp4" />
        <p style={{color: 'red'}}>Video playback is unavailable on this browser.</p>
      </video>
      <Markdown className='md' remarkPlugins={[remarkGfm]}>{props.myteamsText4}</Markdown>
    </div>
  );
}

function OpenGL(props: {id: string, openglText1: string, openglText2: string}): JSX.Element {
  return (
    <div id={props.id}>
      <h1>OpenGL 3D Engine<span className='cursor'>|</span></h1>
      <Markdown className='md' remarkPlugins={[remarkGfm]}>{props.openglText1}</Markdown>
      <video width="100%" height="auto" controls autoPlay loop>
        <source src="https://raw.githubusercontent.com/ValentinRapp/portfolio/media/opengldemo.mp4" type="video/mp4" />
        <p style={{color: 'red'}}>Video playback is unavailable on this browser.</p>
      </video>
      <Markdown className='md' remarkPlugins={[remarkGfm]}>{props.openglText2}</Markdown>
    </div>
  );
}

function Shadertoy(props: {id: string}): JSX.Element {
  return (
    <div id={props.id}>
      <h1>My Shadertoy<span className='cursor'>|</span></h1>
      <p>This was a project made in C++ using OpenGL, this project, although still unfinished, is an attempt at recreating the popular platform <a href='https://www.shadertoy.com/' target='_blank'>shadertoy</a> in C++ using OpenGL.</p>
      <p>Shadertoy is a platform allowing users to easily write standalone shaders in <a href='https://en.wikipedia.org/wiki/OpenGL_Shading_Language' target='_blank'>GLSL (OpenGL Shading Language)</a>.</p>
      <h2>Examples</h2>
      <video width="100%" height="auto" controls autoPlay loop>
          <source src="https://raw.githubusercontent.com/ValentinRapp/portfolio/media/opal.mp4" type="video/mp4" />
          <p style={{color: 'red'}}>Video playback is unavailable on this browser.</p>
      </video>
      <p>This is the effect that is been rendered in the background of this webpage, but higher quality. And yes, what you're seeing when opening this page is not a fancy CSS effect but an actual shader effect :)</p>
      <video width="100%" height="auto" controls autoPlay loop>
          <source src="https://raw.githubusercontent.com/ValentinRapp/portfolio/media/abstract.mp4" type="video/mp4" />
          <p style={{color: 'red'}}>Video playback is unavailable on this browser.</p>
      </video>
      <p>As you can see in this example, my program allows you to fetch the mouse position from the shader and do whatever you want with it.</p>
      <video width="100%" height="auto" controls autoPlay loop>
          <source src="https://raw.githubusercontent.com/ValentinRapp/portfolio/media/clouds.mp4" type="video/mp4" />
          <p style={{color: 'red'}}>Video playback is unavailable on this browser.</p>
      </video>
      <video width="100%" height="auto" controls autoPlay loop>
          <source src="https://raw.githubusercontent.com/ValentinRapp/portfolio/media/fractal.mp4" type="video/mp4" />
          <p style={{color: 'red'}}>Video playback is unavailable on this browser.</p>
      </video>
      <video width="100%" height="auto" controls autoPlay loop>
          <source src="https://raw.githubusercontent.com/ValentinRapp/portfolio/media/sea.mp4" type="video/mp4" />
          <p style={{color: 'red'}}>Video playback is unavailable on this browser.</p>
      </video>
    </div>
  );
}

function Zappy(props: {id: string, zappyText1: string, zappyText2: string}): JSX.Element {
  const [showNetworkDoc, setShowNetworkDoc] = useState(false);
  
  return (
    <div id={props.id}>
      <h1>Zappy<span className='cursor'>|</span></h1>
      <Markdown className='md' remarkPlugins={[remarkGfm]}>{props.zappyText1}</Markdown>
      <video width="100%" height="auto" controls autoPlay loop>
        <source src="https://raw.githubusercontent.com/ValentinRapp/portfolio/media/zappy.mp4" type="video/mp4" />
        <p style={{color: 'red'}}>Video playback is unavailable on this browser.</p>
      </video>
      <p style={{color: "#00aa00", cursor: "pointer"}} onClick={() => setShowNetworkDoc(current => !current)}>If you want more details about how every part communicates together, take a look at the Network documentation protocol (advanced)</p>
      {showNetworkDoc && (
        <Markdown className='md' remarkPlugins={[remarkGfm]}>{props.zappyText2}</Markdown>
      )}
    </div>
  );
}

function S3(props: {id: string, S3text: string}): JSX.Element {
  return (
    <div id={props.id}>
      <h1>S3 Advanced Pricing Simulator<span className='cursor'>|</span></h1>
      <Markdown className='md' remarkPlugins={[remarkGfm]}>{props.S3text}</Markdown>
    </div>
  );
}

const hashedIDs = IDs.map(ID => stringToHash(ID));

function App(): JSX.Element {
  const isMobile = useRef(mobile());

  const [windows, setWindows] = useState<Windows>(
    IDs.reduce((acc, key) => {
      acc[key] = false;
      return acc;
    }, {} as Windows)
  );

  const [inFocus, setInFocus] = useState(0);

  const [raytracerText, setRaytracerText] = useState('');
  const [myteamsText, setMyteamsText] = useState<Array<string>>([]);
  const [openglText, setOpenglText] = useState<Array<string>>([]);
  const [zappyText, setZappyText] = useState<Array<string>>([]);
  const [S3text, setS3text] = useState('');

  useEffect(() => {
    openFile('/raytracer.md', setRaytracerText);

    openFile('/myteams1.md', (text) => setMyteamsText(current => [...current, text]));
    openFile('/myteams2.md', (text) => setMyteamsText(current => [...current, text]));
    openFile('/myteams3.md', (text) => setMyteamsText(current => [...current, text]));
    openFile('/myteams4.md', (text) => setMyteamsText(current => [...current, text]));

    openFile('/opengl_3D_engine1.md', (text) => setOpenglText(current => [...current, text]));
    openFile('/opengl_3D_engine2.md', (text) => setOpenglText(current => [...current, text]));

    openFile('/zappy1.md', (text) => setZappyText(current => [...current, text]));
    openFile('/zappy_network_protocol.md', (text) => setZappyText(current => [...current, text]));

    openFile('/s3pricingsimulator.md', setS3text);
  }, []);

  const switchWindowVisibility = (ID: string) => {
    setWindows(current => IDs.reduce((acc, key) => {
      acc[key] = (key === ID) ? !current[key] : current[key];
      return acc;
    }, {} as Windows));
  }

  const changeWindowVisibility = (ID: string, isOpened: boolean) => {
    setWindows(current => IDs.reduce((acc, key) => {
      acc[key] = (key === ID) ? isOpened : current[key];
      return acc;
    }, {} as Windows));
  }

  const fetchWindowColor = (ID: number) => ID === inFocus ? '#00aa00' : '#777';

  const handleRedirect = (id: string, callback: () => void): void => {
    isMobile.current ? window.location.href = `#${id}` : callback();
  }

  return (
    <>
      <div className='container'>
        <div className='page'>
          <h1 style={{color: '#fff'}}>Valentin Rapp<span className='pagecursor'>|</span></h1>
          <nav>
            <ul>
              <li style={{color: '#fff'}} onClick={() => handleRedirect(IDs[1], () => switchWindowVisibility(IDs[1]))}>contact me</li>
              <li style={{color: '#fff'}} onClick={() => handleRedirect(IDs[0], () => switchWindowVisibility(IDs[0]))}>about me</li>
              <li style={{color: '#fff'}} onClick={() => handleRedirect(IDs[8], () => switchWindowVisibility(IDs[8]))}>projects</li>
              {/* <li style={{color: '#fff'}}>technologies</li> */}
            </ul>
          </nav>
        </div>
        {isMobile.current ? (
          <div className='mobilePage'>
            <AboutMe id={IDs[0]}/>
            <ContactMe id={IDs[1]}/>
            <div id={IDs[8]}>
              <h1>My projects<span className='cursor'>|</span></h1>
              <p>Here are some of my projects:</p>
              <div style={{marginBottom: "15px"}}>
                <nav style={{justifyContent: 'normal'}}>
                  <ul className='list'>
                    <li onClick={() => handleRedirect(IDs[2], () => {})}>Raytracer</li>
                    <li onClick={() => handleRedirect(IDs[4], () => {})}>OpenGL 3D Engine</li>
                    <li onClick={() => handleRedirect(IDs[3], () => {})}>Myteams</li>
                    <li onClick={() => handleRedirect(IDs[7], () => {})}>S3 Advanced Pricing Simulator</li>
                    <li onClick={() => handleRedirect(IDs[5], () => {})}>My Shadertoy</li>
                    <li onClick={() => handleRedirect(IDs[6], () => {})}>Zappy</li>
                  </ul>
                </nav>
              </div>
            </div>
            <Raytracer id={IDs[2]} raytracerText={raytracerText} />
            <OpenGL
              id={IDs[4]}
              openglText1={openglText[0]}
              openglText2={openglText[1]}
            />
            <Myteams
              id={IDs[3]}
              myteamsText1={myteamsText[0]}
              myteamsText2={myteamsText[1]}
              myteamsText3={myteamsText[2]}
              myteamsText4={myteamsText[3]}
            />
            <S3 id={IDs[7]} S3text={S3text} />
            <Shadertoy id={IDs[5]}/>
            <Zappy
              id={IDs[6]}
              zappyText1={zappyText[0]}
              zappyText2={zappyText[1]}
            />
            <ScrollButton visibilityTreshold={window.innerHeight} />
          </div>
        ) : (
          <div className='windows'>
            {windows.contact && (
              <WinBox
                title="Contact"
                x="center"
                y={30}
                width={Math.min(document.body.clientWidth, 450)}
                height={Math.min(document.body.clientHeight, 320)}
                background={fetchWindowColor(hashedIDs[1])}
                onFocus={() => setInFocus(hashedIDs[1])}
                onClose={() => changeWindowVisibility(IDs[1], false)}
              >
                <ContactMe id={IDs[0]}/>
              </WinBox>
            )}
            {windows.about && (
              <WinBox
                title="About me"
                x="center"
                y={30}
                width={Math.min(document.body.clientWidth, 700)}
                height={Math.min(document.body.clientHeight, 540)}
                background={fetchWindowColor(hashedIDs[0])}
                onFocus={() => setInFocus(hashedIDs[0])}
                onClose={() => changeWindowVisibility(IDs[0], false)}
              >
                <AboutMe id={IDs[1]}/>
              </WinBox>
            )}
            {windows.projects && (
              <WinBox
                title="Projects"
                x="center"
                y={30}
                width={Math.min(document.body.clientWidth, 700)}
                height={Math.min(document.body.clientHeight, 506)}
                background={fetchWindowColor(hashedIDs[8])}
                onFocus={() => setInFocus(hashedIDs[8])}
                onClose={() => changeWindowVisibility(IDs[8], false)}
              >
                <div id={IDs[8]}>
                  <h2>My projects<span className='cursor'>|</span></h2>
                  <p>Here are some of my projects:</p>
                  <div>
                    <nav style={{justifyContent: 'normal'}}>
                      <ul className='list'>
                        {/* When a user clicks, it sets the window the user is clicking on in focus instead of
                        the window that appears; making the window appear with a slight delay resolves this issue */}
                        <li onClick={() => setTimeout(() => switchWindowVisibility(IDs[2]), 1)}>Raytracer</li>
                        <li onClick={() => setTimeout(() => switchWindowVisibility(IDs[4]), 1)}>OpenGL 3D Engine</li>
                        <li onClick={() => setTimeout(() => switchWindowVisibility(IDs[3]), 1)}>Myteams</li>
                        <li onClick={() => setTimeout(() => switchWindowVisibility(IDs[7]), 1)}>S3 Advanced Pricing Simulator</li>
                        <li onClick={() => setTimeout(() => switchWindowVisibility(IDs[5]), 1)}>My Shadertoy</li>
                        <li onClick={() => setTimeout(() => switchWindowVisibility(IDs[6]), 1)}>Zappy</li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </WinBox>
            )}
            {windows.raytracer && (
              <WinBox
                title="Raytracer"
                x="center"
                y={30}
                width={Math.min(document.body.clientWidth, 950)}
                height={Math.min(document.body.clientHeight, 900)}
                background={fetchWindowColor(hashedIDs[2])}
                onFocus={() => setInFocus(hashedIDs[2])}
                onClose={() => changeWindowVisibility(IDs[2], false)}
              >
                <Raytracer id={IDs[2]} raytracerText={raytracerText} />
              </WinBox>
            )}
            {windows.myteams && (
              <WinBox
                title="Myteams"
                x="center"
                y={30}
                width={Math.min(document.body.clientWidth, 950)}
                height={Math.min(document.body.clientHeight, 700)}
                background={fetchWindowColor(hashedIDs[3])}
                onFocus={() => setInFocus(hashedIDs[3])}
                onClose={() => changeWindowVisibility(IDs[3], false)}
              >
                <Myteams
                  id={IDs[3]}
                  myteamsText1={myteamsText[0]}
                  myteamsText2={myteamsText[1]}
                  myteamsText3={myteamsText[2]}
                  myteamsText4={myteamsText[3]}
                />
              </WinBox>
            )}
            {windows.opengl && (
              <WinBox
                title="OpenGL 3D Engine"
                x="center"
                y={30}
                width={Math.min(document.body.clientWidth, 950)}
                height={Math.min(document.body.clientHeight, 840)}
                background={fetchWindowColor(hashedIDs[4])}
                onFocus={() => setInFocus(hashedIDs[4])}
                onClose={() => changeWindowVisibility(IDs[4], false)}
              >
                <OpenGL
                  id={IDs[4]}
                  openglText1={openglText[0]}
                  openglText2={openglText[1]}
                />
              </WinBox>
            )}
            {windows.shadertoy && (
              <WinBox
                title="My Shadertoy"
                x="center"
                y={30}
                width={Math.min(document.body.clientWidth, 950)}
                height={Math.min(document.body.clientHeight, 840)}
                background={fetchWindowColor(hashedIDs[5])}
                onFocus={() => setInFocus(hashedIDs[5])}
                onClose={() => changeWindowVisibility(IDs[5], false)}
              >
                <Shadertoy id={IDs[5]}/>
              </WinBox>
            )}
            {windows.zappy && (
              <WinBox
                title="Zappy"
                x="center"
                y={30}
                width={Math.min(document.body.clientWidth, 950)}
                height={Math.min(document.body.clientHeight, 840)}
                background={fetchWindowColor(hashedIDs[6])}
                onFocus={() => setInFocus(hashedIDs[6])}
                onClose={() => changeWindowVisibility(IDs[6], false)}
              >
                <Zappy
                  id={IDs[6]}
                  zappyText1={zappyText[0]}
                  zappyText2={zappyText[1]}
                />
              </WinBox>
            )}
            {windows.s3 && (
              <WinBox
                title="S3 Advanced Pricing Simulator"
                x="center"
                y={30}
                width={Math.min(document.body.clientWidth, 950)}
                height={Math.min(document.body.clientHeight, 840)}
                background={fetchWindowColor(hashedIDs[7])}
                onFocus={() => setInFocus(hashedIDs[7])}
                onClose={() => changeWindowVisibility(IDs[7], false)}
              >
                <S3 id={IDs[7]} S3text={S3text} />
              </WinBox>
            )}
          </div>
        )}
      </div>
    </>
  )
}

export default App
