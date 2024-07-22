import { useEffect, useState } from 'react'
import './App.css'
import './windows.css'
import 'winbox/dist/css/winbox.min.css'; // required
import 'winbox/dist/css/themes/modern.min.css'; // optional
import WinBox from 'react-winbox';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const openFile = (path: string, callback: (text: string) => void): void => {
  fetch(path)
    .then(response => response.text())
    .then(text => callback(text));
}

function ContactMe(): JSX.Element {
  return (
    <div>
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

function AboutMe(): JSX.Element {
  return (
    <div>
      <h2>About me<span className='cursor'>|</span></h2>
      <p>Hi! I'm Valentin Rapp, a computer science student from France pursuing a master's degree in software engineering. I'm passionate about maths and programming in general, more specifically anything related to graphics programming. I like to understand deeply how things work so I often work with low level languages to get a better grasp of comp-sci concepts I didn't know before. I've been passionate about computers since I was young and I'm always eager to learn more!</p>
      <p>I am currently looking for a part-time internship from September to February 2024 in anything regarding tech.</p>
    </div>
  );
}

function Raytracer(props: {raytracerText: string}): JSX.Element {
  return (
    <div>
      <h1>Raytracer<span className='cursor'>|</span></h1>
      <Markdown className='md' remarkPlugins={[remarkGfm]}>{props.raytracerText}</Markdown>
    </div>
  );
}

function Myteams(props: {myteamsText1: string, myteamsText2: string, myteamsText3: string, myteamsText4: string}): JSX.Element {
  return (
    <div>
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

function OpenGL(props: {openglText1: string, openglText2: string}): JSX.Element {
  return (
    <div>
      <h1>OpenGL 3D Engine<span className='cursor'>|</span></h1>
      <Markdown className='md' remarkPlugins={[remarkGfm]}>{props.openglText1}</Markdown>
      <video width="100%" height="auto" autoPlay loop>
        <source src="screenshots/opengldemo.mp4" type="video/mp4" />
        <p style={{color: 'red'}}>Video playback is unavailable on this browser.</p>
      </video>
      <Markdown className='md' remarkPlugins={[remarkGfm]}>{props.openglText2}</Markdown>
    </div>
  );
}

function Shadertoy(): JSX.Element {
  return (
    <div>
      <h1>My Shadertoy<span className='cursor'>|</span></h1>
      <p>This was a project made in C++ using OpenGL, this project, although still unfinished, is an attempt at recreating the popular platform <a href='https://www.shadertoy.com/' target='_blank'>shadertoy</a> in C++ using OpenGL.</p>
      <p>Shadertoy is a platform allowing users to easily write standalone shaders in <a href='https://en.wikipedia.org/wiki/OpenGL_Shading_Language' target='_blank'>GLSL (OpenGL Shading Language)</a>.</p>
      <h2>Examples</h2>
      <video width="100%" height="auto" autoPlay loop>
          <source src="screenshots/opal.mp4" type="video/mp4" />
          <p style={{color: 'red'}}>Video playback is unavailable on this browser.</p>
      </video>
      <p>This is the effect that is been rendered in the background of this webpage, but higher quality. And yes, what you're seeing when opening this page is not a fancy CSS effect but an actual shader effect :)</p>
      <video width="100%" height="auto" autoPlay loop>
          <source src="screenshots/abstract.mp4" type="video/mp4" />
          <p style={{color: 'red'}}>Video playback is unavailable on this browser.</p>
      </video>
      <p>As you can see in this example, my program allows you to fetch the mouse position from the shader and do whatever you want with it.</p>
      <video width="100%" height="auto" autoPlay loop>
          <source src="screenshots/clouds.mp4" type="video/mp4" />
          <p style={{color: 'red'}}>Video playback is unavailable on this browser.</p>
      </video>
      <video width="100%" height="auto" autoPlay loop>
          <source src="screenshots/fractal.mp4" type="video/mp4" />
          <p style={{color: 'red'}}>Video playback is unavailable on this browser.</p>
      </video>
      <video width="100%" height="auto" autoPlay loop>
          <source src="screenshots/sea.mp4" type="video/mp4" />
          <p style={{color: 'red'}}>Video playback is unavailable on this browser.</p>
      </video>
    </div>
  );
}

function Zappy(props: {zappyText1: string, zappyText2: string}): JSX.Element {
  const [showNetworkDoc, setShowNetworkDoc] = useState(false);
  
  return (
    <div>
      <h1>Zappy<span className='cursor'>|</span></h1>
      <Markdown className='md' remarkPlugins={[remarkGfm]}>{props.zappyText1}</Markdown>
      <video width="100%" height="auto" controls autoPlay loop>
        <source src="screenshots/zappy.mp4" type="video/mp4" />
        <p style={{color: 'red'}}>Video playback is unavailable on this browser.</p>
      </video>
      <p style={{color: "#00aa00", cursor: "pointer"}} onClick={() => setShowNetworkDoc(true)}>If you want more details about how every part communicates together, take a look at the Network documentation protocol (advanced)</p>
      {showNetworkDoc && (
        <Markdown className='md' remarkPlugins={[remarkGfm]}>{props.zappyText2}</Markdown>
      )}
    </div>
  );
}

function S3(props: {S3text: string}): JSX.Element {
  return (
    <div>
      <h1>S3 Advanced Pricing Simulator<span className='cursor'>|</span></h1>
      <Markdown className='md' remarkPlugins={[remarkGfm]}>{props.S3text}</Markdown>
    </div>
  );
}

function App(): JSX.Element {
  const [openContactWin, setOpenContactWin] = useState(false);
  const [contactWinBackgroundCol, setContactWinBackgroundCol] = useState('#00aa00');

  const [openAboutWin, setOpenAboutWin] = useState(false);
  const [aboutWinBackgroundCol, setAboutWinBackgroundCol] = useState('#00aa00');

  const [openProjectsWin, setOpenProjectsWin] = useState(false);
  const [projectsWinBackgroundCol, setProjectsWinBackgroundCol] = useState('#00aa00');

  const [openRaytracerWin, setOpenRaytracerWin] = useState(false);
  const [raytracerWinBackgroundCol, setRaytracerWinBackgroundCol] = useState('#00aa00');

  const [openMyteamsWin, setOpenMyteamsWin] = useState(false);
  const [myteamsWinBackgroundCol, setMyteamsWinBackgroundCol] = useState('#00aa00');

  const [openOpenglWin, setOpenOpenglWin] = useState(false);
  const [openglWinBackgroundCol, setOpenglWinBackgroundCol] = useState('#00aa00');

  const [shadertoyWin, setShadertoyWin] = useState(false);
  const [shadertoyWinBackgroundCol, setShadertoyWinBackgroundCol] = useState('#00aa00');

  const [openZappyWin, setOpenZappyWin] = useState(false);
  const [zappyWinBackgroundCol, setZappyWinBackgroundCol] = useState('#00aa00');

  const [openS3Win, setOpenS3Win] = useState(false);
  const [S3WinBackgroundCol, setS3WinBackgroundCol] = useState('#00aa00');

  const [raytracerText, setRaytracerText] = useState('');
  const [myteamsText1, setMyteamsText1] = useState('');
  const [myteamsText2, setMyteamsText2] = useState('');
  const [myteamsText3, setMyteamsText3] = useState('');
  const [myteamsText4, setMyteamsText4] = useState('');
  const [openglText1, setOpenglText1] = useState('');
  const [openglText2, setOpenglText2] = useState('');
  const [zappyText1, setZappyText1] = useState('');
  const [zappyText2, setZappyText2] = useState('');
  const [S3text, setS3text] = useState('');

  useEffect(() => {
    openFile('resources/raytracer.md', setRaytracerText);
    openFile('resources/myteams1.md', setMyteamsText1);
    openFile('resources/myteams2.md', setMyteamsText2);
    openFile('resources/myteams3.md', setMyteamsText3);
    openFile('resources/myteams4.md', setMyteamsText4);
    openFile('resources/opengl_3D_engine1.md', setOpenglText1);
    openFile('resources/opengl_3D_engine2.md', setOpenglText2);
    openFile('resources/zappy1.md', setZappyText1);
    openFile('resources/zappy_network_protocol.md', setZappyText2);
    openFile('resources/s3pricingsimulator.md', setS3text);
  }, []);

  return (
    <>
    <div className='container'>
      <div className='page'>
        <h1 style={{color: '#fff'}}>Valentin Rapp<span className='pagecursor'>|</span></h1>
        <nav>
          <ul>
            <li style={{color: '#fff'}} onClick={() => setOpenContactWin(!openContactWin)}>contact me</li>
            <li style={{color: '#fff'}} onClick={() => setOpenAboutWin(!openAboutWin)}>about me</li>
            <li style={{color: '#fff'}} onClick={() => setOpenProjectsWin(!openProjectsWin)}>projects</li>
            {/* <li style={{color: '#fff'}}>technologies</li> */}
          </ul>
        </nav>
      </div>
      <div className='windows'>
        {openContactWin && (
          <WinBox
            title="Contact"
            x="center"
            y={30}
            width={Math.min(document.body.clientWidth, 450)}
            height={Math.min(document.body.clientHeight, 320)}
            background={contactWinBackgroundCol}
            onFocus={() => setContactWinBackgroundCol('#00aa00')}
            onBlur={() => setContactWinBackgroundCol('#777')}
            onClose={() => setOpenContactWin(false)}
          >
            <ContactMe />
          </WinBox>
        )}
        {openAboutWin && (
          <WinBox
            title="About me"
            x="center"
            y={30}
            width={Math.min(document.body.clientWidth, 700)}
            height={Math.min(document.body.clientHeight, 540)}
            background={aboutWinBackgroundCol}
            onFocus={() => setAboutWinBackgroundCol('#00aa00')}
            onBlur={() => setAboutWinBackgroundCol('#777')}
            onClose={() => setOpenAboutWin(false)}
          >
            <AboutMe />
          </WinBox>
        )}
        {openProjectsWin && (
          <WinBox
            title="Projects"
            x="center"
            y={30}
            width={Math.min(document.body.clientWidth, 700)}
            height={Math.min(document.body.clientHeight, 506)}
            background={projectsWinBackgroundCol}
            onFocus={() => setProjectsWinBackgroundCol('#00aa00')}
            onBlur={() => setProjectsWinBackgroundCol('#777')}
            onClose={() => setOpenProjectsWin(false)}
          >
            <div>
              <h2>My projects<span className='cursor'>|</span></h2>
              <p>Here are some of my projects:</p>
              <div className='page'>
                <nav>
                  <ul className='list'>
                    {/* When a user clicks, it sets the window the user is clicking on in focus instead of
                    the window that appears; making the window appear with a slight delay resolves this issue */}
                    <li onClick={() => setTimeout(() => setOpenRaytracerWin(!openRaytracerWin), 1)}>Raytracer</li>
                    <li onClick={() => setTimeout(() => setOpenOpenglWin(!openOpenglWin), 1)}>OpenGL 3D Engine</li>
                    <li onClick={() => setTimeout(() => setOpenMyteamsWin(!openMyteamsWin), 1)}>Myteams</li>
                    <li onClick={() => setTimeout(() => setOpenS3Win(!openS3Win), 1)}>S3 Advanced Pricing Simulator</li>
                    <li onClick={() => setTimeout(() => setShadertoyWin(!shadertoyWin), 1)}>My Shadertoy</li>
                    <li onClick={() => setTimeout(() => setOpenZappyWin(!openZappyWin), 1)}>Zappy</li>
                  </ul>
                </nav>
              </div>
            </div>
          </WinBox>
        )}
        {openRaytracerWin && (
          <WinBox
            title="Raytracer"
            x="center"
            y={30}
            width={Math.min(document.body.clientWidth, 950)}
            height={Math.min(document.body.clientHeight, 900)}
            background={raytracerWinBackgroundCol}
            onFocus={() => setRaytracerWinBackgroundCol('#00aa00')}
            onBlur={() => setRaytracerWinBackgroundCol('#777')}
            onClose={() => setOpenRaytracerWin(false)}
          >
            <Raytracer raytracerText={raytracerText} />
          </WinBox>
        )}
        {openMyteamsWin && (
          <WinBox
            title="Myteams"
            x="center"
            y={30}
            width={Math.min(document.body.clientWidth, 950)}
            height={Math.min(document.body.clientHeight, 700)}
            background={myteamsWinBackgroundCol}
            onFocus={() => setMyteamsWinBackgroundCol('#00aa00')}
            onBlur={() => setMyteamsWinBackgroundCol('#777')}
            onClose={() => setOpenMyteamsWin(false)}
          >
            <Myteams
              myteamsText1={myteamsText1}
              myteamsText2={myteamsText2}
              myteamsText3={myteamsText3}
              myteamsText4={myteamsText4}
            />
          </WinBox>
        )}
        {openOpenglWin && (
          <WinBox
            title="OpenGL 3D Engine"
            x="center"
            y={30}
            width={Math.min(document.body.clientWidth, 950)}
            height={Math.min(document.body.clientHeight, 840)}
            background={openglWinBackgroundCol}
            onFocus={() => setOpenglWinBackgroundCol('#00aa00')}
            onBlur={() => setOpenglWinBackgroundCol('#777')}
            onClose={() => setOpenOpenglWin(false)}
          >
            <OpenGL
              openglText1={openglText1}
              openglText2={openglText2}
            />
          </WinBox>
        )}
        {shadertoyWin && (
          <WinBox
            title="My Shadertoy"
            x="center"
            y={30}
            width={Math.min(document.body.clientWidth, 950)}
            height={Math.min(document.body.clientHeight, 840)}
            background={shadertoyWinBackgroundCol}
            onFocus={() => setShadertoyWinBackgroundCol('#00aa00')}
            onBlur={() => setShadertoyWinBackgroundCol('#777')}
            onClose={() => setShadertoyWin(false)}
          >
            <Shadertoy />
          </WinBox>
        )}
        {openZappyWin && (
          <WinBox
            title="Zappy"
            x="center"
            y={30}
            width={Math.min(document.body.clientWidth, 950)}
            height={Math.min(document.body.clientHeight, 840)}
            background={zappyWinBackgroundCol}
            onFocus={() => setZappyWinBackgroundCol('#00aa00')}
            onBlur={() => setZappyWinBackgroundCol('#777')}
            onClose={() => setOpenZappyWin(false)}
          >
            <Zappy zappyText1={zappyText1} zappyText2={zappyText2}/>
          </WinBox>
        )}
        {openS3Win && (
          <WinBox
            title="S3 Advanced Pricing Simulator"
            x="center"
            y={30}
            width={Math.min(document.body.clientWidth, 950)}
            height={Math.min(document.body.clientHeight, 840)}
            background={S3WinBackgroundCol}
            onFocus={() => setS3WinBackgroundCol('#00aa00')}
            onBlur={() => setS3WinBackgroundCol('#777')}
            onClose={() => setOpenS3Win(false)}
          >
            <S3 S3text={S3text} />
          </WinBox>
        )}
      </div>
    </div>
    </>
  )
}

export default App
