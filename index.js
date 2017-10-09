const xml = `<soapenv:Envelope xmlns.soapenv="http://schemas.xmlsoap.org/soap/envelope/"
  xmlns="urn:enterprise.soap.sforce.com">
  <soapenv:Body blo="\${bla > 5 ? dd : ''}" foo.bind='bar'>
     <createResponse>
        <result>
           <id>003D000000OY9omIAD > 5 ? 4 "3"</id>
           <success>true</success>
        </result>
        What does it say ?
        <result>
           <id>001D000000HTK3aIAH</id>
           <success>true</success>
        </result>
     </createResponse>
  </soapenv:Body>
</soapenv:Envelope>`;

// var xmlParser = require("xml-parser")

// var result = xmlParser(xml);
 
//  console.log(result)

 var onEventCallback = function (event) {
  switch (event.eventType) {

      case xmlModule.ParserEventType.StartElement:
          var message = event.eventType + " " + event.elementName;
          if (event.attributes) {
              message += ", Attributes:";
              for (var attributeName in event.attributes) {
                  if (event.attributes.hasOwnProperty(attributeName)) {
                      message += ` [${attributeName}="${event.attributes[attributeName]}"]`;
                  }
              }
          }
          console.log(message);
          break;

      case xmlModule.ParserEventType.EndElement:
          console.log(event.eventType + " " + event.elementName);
          break;

      case xmlModule.ParserEventType.Text:
          var significantText = event.data.trim();
          if (significantText !== "") {
              console.log(event.eventType + "=\"" + significantText + "\"");
          }
          break;
  }
};

var onErrorCallback = function (error) {
  console.log("Error: " + error.message);
};

var xmlModule = require("tns-core-modules/xml");
var xmlParser = new xmlModule.XmlParser(onEventCallback, onErrorCallback);
xmlParser.parse(xml);
