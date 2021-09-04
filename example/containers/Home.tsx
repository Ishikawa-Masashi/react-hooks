import React from 'react';
import {
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  FunctionComponent,
} from 'react';

// import {
//   BrowserRouter as Router,
//   Route,
//   Switch,
//   useParams,
//   useHistory,
//   useLocation,
//   Link,
// } from 'react-router-dom';

import * as monaco from '../../src';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import Info from './Info';
import InputLabel from '@material-ui/core/InputLabel';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuItem from '@material-ui/core/MenuItem';
import { Editor, MonacoEditorHandle, WritingMode } from '../../src';
import Select from '@material-ui/core/Select';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Button from '@material-ui/core/Button';

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SAMPLES from '../samples';
import { setModelLanguage } from '../../src/vs/editor/standalone/browser/standaloneEditor';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    width: '100%',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  toolbar: theme.mixins.toolbar,
}));

export default function Home(): JSX.Element {
  const classes = useStyles();
  // const history = useHistory();
  const [value, setValue] = useState(0);
  const [modeId, setModeId] = useState('typescript');
  const [theme, setTheme] = useState<'vs' | 'vs-dark' | 'hc-black'>('vs');
  // const modelRef = useRef(createModel());
  const [model, setModel] = useState(
    monaco.editor.createModel(SAMPLES[modeId])
  );

  const [writingMode, setWritingMode] = useState(
    WritingMode.LeftToRightHorizontalWriting
  );

  const [wordWrap, setWordWrap] = useState<'off' | 'on'>('off');
  const [renderMinimap, setRenderMinimap] = useState<'off' | 'on'>('on');

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setModeId(event.target.value as string);
  };

  const handleChangeTheme = (event: React.ChangeEvent<{ value: unknown }>) => {
    setTheme(event.target.value as 'vs' | 'vs-dark' | 'hc-black');
  };

  const handleChangeWritingMode = (event: ChangeEvent<{ value: unknown }>) => {
    setWritingMode(event.target.value as any);
  };

  const handleChangeWordWrap = (event: ChangeEvent<{ value: unknown }>) => {
    setWordWrap(event.target.value as any);
  };

  const handleChangeRenderMinimap = (
    event: ChangeEvent<{ value: unknown }>
  ) => {
    setRenderMinimap(event.target.value as any);
  };

  const monacoEditorRef = useRef<MonacoEditorHandle>(null);

  useEffect(() => {
    const modesIds = monaco.languages.getLanguages().map((lang) => lang.id);
    console.log(modesIds);
    return () => {};
  });

  useEffect(() => {
    if (monacoEditorRef.current) {
      const monacoEditor = monacoEditorRef.current;
      // monacoEditor.setValue(SAMPLES[modeId]);
      // monacoEditor.setModelLanguage(modeId);
    }
  }, [monacoEditorRef.current]);

  useEffect(() => {
    if (monacoEditorRef.current) {
      const monacoEditor = monacoEditorRef.current;
      // monacoEditor.setValue(SAMPLES[modeId]);
      // monacoEditor.setModelLanguage(modeId);
    }
    // modelRef.current?.setValue(createModel(SAMPLES[modeId]))
    const model = monaco.editor.createModel(SAMPLES[modeId]);
    setModelLanguage(model, modeId);
    setModel(model);
  }, [modeId]);

  useEffect(() => {
    if (monacoEditorRef.current) {
      const monacoEditor = monacoEditorRef.current;
      // monacoEditor.setTheme(theme);
    }
  }, [theme]);

  const THEME = {
    'Visual Studio': 'vs',
    'Visual Studio Dark': 'vs-dark',
    'High Contrast Dark': 'hc-black',
  };
  // function changeTheme(theme) {
  //   var newTheme = theme === 1 ? 'vs-dark' : theme === 0 ? 'vs' : 'hc-black';
  //   monaco.editor.setTheme(newTheme);
  // }

  const menuItems = () => {
    const modesIds = monaco.languages.getLanguages().map((lang) => lang.id);
    modesIds.sort();

    return modesIds.map((modeId, index) => (
      <MenuItem key={index} value={modeId}>
        {modeId}
      </MenuItem>
    ));
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            React Monaco Editor
          </Typography>
          <div style={{ width: '64px' }}></div>
        </Toolbar>
      </AppBar>

      <main className={classes.content}>
        <div className={classes.toolbar} />
        <FormControl className={classes.formControl}>
          <InputLabel id="mode-select-label">Language</InputLabel>
          <Select
            labelId="mode-select-label"
            id="mode-select"
            value={modeId}
            onChange={handleChange}
          >
            {menuItems()}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Theme</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={theme}
            onChange={handleChangeTheme}
          >
            <MenuItem value={'vs'}>Visual Studio</MenuItem>
            <MenuItem value={'vs-dark'}>Visual Studio Dark</MenuItem>
            <MenuItem value={'hc-black'}>High Contrast Dark</MenuItem>
          </Select>
        </FormControl>

        <FormControl className={classes.formControl}>
          <InputLabel id="writing-mode-select-label">Writing Mode</InputLabel>
          <Select
            labelId="writing-mode-select-label"
            id="writing-mode-select"
            value={writingMode}
            onChange={handleChangeWritingMode}
          >
            <MenuItem value={WritingMode.LeftToRightHorizontalWriting}>
              Left-To-Right Horizontal Writing
            </MenuItem>
            <MenuItem value={WritingMode.RightToLeftVerticalWriting}>
              Right-To-Left Vertical Writing
            </MenuItem>
          </Select>
        </FormControl>

        <FormControl className={classes.formControl}>
          <InputLabel id="word-wrap-select-label">Word Wrap</InputLabel>
          <Select
            labelId="word-wrap-select-label"
            id="word-wrap-select"
            value={wordWrap}
            onChange={handleChangeWordWrap}
          >
            <MenuItem value={'off'}>Off</MenuItem>
            <MenuItem value={'on'}>On</MenuItem>
          </Select>
        </FormControl>

        <FormControl className={classes.formControl}>
          <InputLabel id="minimap-label">Minimap</InputLabel>
          <Select
            labelId="minimap-label"
            id="minimap-select"
            value={renderMinimap}
            onChange={handleChangeRenderMinimap}
          >
            <MenuItem value={'off'}>Off</MenuItem>
            <MenuItem value={'on'}>On</MenuItem>
          </Select>
        </FormControl>

        <div style={{ width: '100%', height: 'calc(100vh - 180px)' }}>
          <Editor
            ref={monacoEditorRef}
            model={model}
            options={{ writingMode, wordWrap }}
          />
        </div>
      </main>
    </div>
  );
}
