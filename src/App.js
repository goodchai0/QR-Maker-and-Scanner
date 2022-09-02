import logo from './logo.svg';
import {Container,Card,CardContent,makeStyles, Button,Grid,FormHelperText, TextField, responsiveFontSizes} from '@material-ui/core'
import './App.css';
import QRCode from 'qrcode'
import {useState,useRef} from 'react'
import {QrReader} from 'react-qr-reader';

function App() {

  const [text,setText]=useState('')
  const [imageUrl,setImageUrl]=useState('');
  const classes = useStyles();
  const qrRef=useRef(null);
  const [scanResultFile,setScanResultFile]=useState('')


  const generateQrCode=async()=>{
    try{
        const response=await QRCode.toDataURL(text);
        setImageUrl(response);
    }
    catch(error){
      console.log(error)
    }
  }
  
  const handleErrorFile=(error)=>{
    console.log(error);
  }
  const handleScanFile=(result)=>{
    if(result){
      setScanResultFile(result);
    }
  }

  const onScanFile = () => {
    qrRef.current.openImageDialog();

  }
  return (
    <Container>
      <Card>
        <h2 className={classes.title}>Generate DownLoad & Scan QR code</h2>
        <CardContent>
          <Grid container spacing={4}>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
              <TextField label="Enter Text Here" onChange={(e)=>setText(e.target.value)}></TextField> 
              <Button variant="contained" className={classes.btn} 
                color="primary" onClick={()=>generateQrCode()}>
                Generate
              </Button>
              <br/>
              <br/>
              <br/>
              {imageUrl?(<a href={imageUrl} download><img src={imageUrl} alt='img'/></a>):null}
            </Grid>
            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
            <Button className={classes.btn} variant="contained" color="secondary" onClick={onScanFile}>Scan Qr Code</Button>
              
            <QrReader
              useRef={qrRef}
              onResult={(result, error) => {
                if (!!result) {
                  setScanResultFile(result?.text);
                }

                if (!!error) {
                  console.info(error);
                }
              }}
              style={{ width: '100%' }}

              scanDelay={300}
              
              legacyMode
            />

              <h3>Scanned Code: {scanResultFile}</h3>
            </Grid>
            </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}

const useStyles=makeStyles((theme)=>({
  container: {
    marginTop:10
  },
  title:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    background:'grey',
    color:'#fff',
    padding:20
  },
  btn:{
    marginTop:10,
    // marginBottom:20
  }
}))

export default App;
