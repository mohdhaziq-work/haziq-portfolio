import { NextResponse } from 'next/server'

/**
 * Firebase Auth Handler
 * 
 * This serves as the OAuth redirect handler at /__/auth/handler
 * When Google Sign-In completes, Google redirects the popup here.
 * This page relays the auth result back to the parent window.
 */
export async function GET() {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Authenticating...</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{display:flex;align-items:center;justify-content:center;min-height:100vh;font-family:Inter,system-ui,sans-serif;background:#f8f9fa}
.wrap{text-align:center;padding:2rem}
.spinner{width:40px;height:40px;border:3px solid #e8eaed;border-top-color:#1a73e8;border-radius:50%;animation:spin .8s linear infinite;margin:0 auto 1.5rem}
@keyframes spin{to{transform:rotate(360deg)}}
p{color:#5f6368;font-size:14px}
</style>
</head>
<body>
<div class="wrap">
<div class="spinner"></div>
<p>Authenticating...</p>
</div>
<script>
(function(){
  // Firebase Auth Popup Handler
  // After Google OAuth, the popup redirects here.
  // We relay the auth result back to the parent window.

  function relayAuthResult(){
    var redirectUrl=window.location.href;

    // Firebase Auth SDK expects messages in specific formats
    // Try all known formats for maximum compatibility

    // Format 1: Firebase Auth v9+ popup callback
    if(window.opener){
      try{
        window.opener.postMessage({
          type:'firebase:auth:popup:redirect',
          data:{redirectUrl:redirectUrl}
        },'*');
      }catch(e){}
    }

    // Format 2: Generic auth event
    if(window.opener){
      try{
        var authEvent={
          type:'signInWithPopup',
          eventId:null,
          url:redirectUrl,
          tenantId:null,
          error:null,
          eventResponse:redirectUrl
        };
        window.opener.postMessage({
          type:'authEvent',
          data:authEvent
        },'*');
      }catch(e){}
    }

    // Format 3: Simple URL relay
    if(window.opener){
      try{
        window.opener.postMessage({
          type:'___grecaptcha_config',
          firebaseAutoSignIn:redirectUrl
        },'*');
      }catch(e){}
    }

    // Format 4: Direct relay used by Firebase SDK
    if(window.opener){
      try{
        // Firebase Auth internal format
        window.opener.postMessage(redirectUrl,'*');
      }catch(e){}
    }

    // Format 5: The actual format Firebase uses internally
    if(window.opener){
      try{
        var hash=window.location.hash;
        var search=window.location.search;
        var fullResponse=redirectUrl;

        // Parse the OAuth response
        var params=new URLSearchParams(search);
        var code=params.get('code');
        var state=params.get('state');
        var error=params.get('error');
        var tokenObj={};

        if(hash){
          try{
            var hashStr=hash.substring(1);
            tokenObj=JSON.parse(decodeURIComponent(hashStr));
          }catch(e){}
        }

        // Send structured response
        window.opener.postMessage({
          type:'firebase:auth:popup:redirect:result',
          data:{
            code:code,
            state:state,
            error:error,
            redirectUrl:fullResponse,
            tokens:tokenObj
          }
        },'*');
      }catch(e){}
    }

    // Close popup after delay
    setTimeout(function(){
      try{window.close();}catch(e){}
      // If close doesn't work, show done message
      document.querySelector('.wrap').innerHTML='<p style="color:#34a853;font-weight:600">Done! You can close this tab.</p>';
    },1000);
  }

  // Run immediately
  relayAuthResult();
})();
</script>
</body>
</html>`

  return new NextResponse(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    },
  })
}
