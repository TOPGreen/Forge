var viewer;

var options = {
    env: 'AutodeskProduction',
    api: 'derivativeV2',  // for models uploaded to EMEA change this option to 'derivativeV2_EU'
    getAccessToken: getForgeToken,
}


function getForgeToken(onTokenReady) {
    $.get("/oauth", (data) => {
        var token = data.access_token;
        var timeInSeconds = data.expires_in; // Use value provided by Forge Authentication (OAuth) API
        onTokenReady(token, timeInSeconds);
    })
}

Autodesk.Viewing.Initializer(options, function () {

    var htmlDiv = document.getElementById('forgeViewer');
    viewer = new Autodesk.Viewing.GuiViewer3D(htmlDiv);
    var startedCode = viewer.start();
    if (startedCode > 0) {
        console.error('Failed to create a Viewer: WebGL not supported.');
        return;
    }


    console.log('Initialization complete, loading a model next...');
    var documentId = 'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6bW9kZWwyMDE5LTEwLTA0LTE4LTA5LTM2LWQ0MWQ4Y2Q5OGYwMGIyMDRlOTgwMDk5OGVjZjg0MjdlL1JvYm90QXJtLmR3Zng';
    Autodesk.Viewing.Document.load(documentId, onDocumentLoadSuccess, onDocumentLoadFailure);
});



function onDocumentLoadSuccess(viewerDocument) {
    var defaultModel = viewerDocument.getRoot().getDefaultGeometry();
    viewer.loadDocumentNode(viewerDocument, defaultModel);

}

function onDocumentLoadFailure() {
    console.error('Failed fetching Forge manifest');
}

