import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as botJson from '../assets/bot-answers.json';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  isCustomChat!: boolean;
  public socket1!: WebSocket;
  public socket2!: WebSocket
  messages = new Array<any>();
  messageArray = new Array<Message>()
  messageObj = new Message();
  data: any
  isPopupClose!: boolean;
  letMeCheck!: boolean
  targetString!: string
  targtString!: string
  currentUser: any;
  userName!: any
  grettingMessage!: string[]
  welcomeMesg: string[] = [];
  typedStrings: string[] = [];
  typedString: string[] = [];
  currentIndex: number = 0;
  crntIndex: number = 0;
  hideCard!: boolean;
  acntStatementResponse: any;
  isBotSocket!: boolean;
  isUserSocket!: boolean;

  botData: any = botJson;

  subject = new Subject<number>();
  behaviourSubject = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient) {
  }

  setObs(value: number) {
    this.subject.next(value);
    this.behaviourSubject.next(value);
  }

  greetmsges() {

    if (this.welcomeMesg.length === 3) {
      this.hideCard = true;
    }
    else {
      this.hideCard = false
    }



    this.grettingMessage = ["Hello " + this.userName + "!" + ". Welcome to Toucan. How can I help you today? ",
    "Good day! " + this.userName + ".  I am Toucan's merchant acquisition assistant. How may I be of service to you?",
    "Hey! " + this.userName + ". I'm your friendly merchant acquisition chatbot. What can I do for you?",
    "Greetings! " + this.userName + ". It's a pleasure to have you here at Toucan. Let's work together to boost your merchant acquisitions!",
    "Hi! " + this.userName + ". I'm here to make your merchant acquisition journey easier. What can I assist you with today?",
    "Hello " + this.userName + ". Welcome to Toucan. How can I assist you with merchant acquisition today? "];
    let index = Math.floor(Math.random() * this.grettingMessage.length)
    this.welcomeMesg = this.grettingMessage[index].split(". ")
    // this.currentUser = localStorage.getItem('currentUser')
    this.currentUser = 'adsfas'
    if (!this.socket1) {
      this.typingEffect()
    }

  }
  scrollToBottom(): void {

    const container = document.querySelector('.cb-scroll');

    if (container) {
      container.scrollTop = container.scrollHeight;
      // window.scrollTo(0,container.scrollHeight)

    }
  }
  // agentChat1() {
  //    
  //   if (!this.isCustomChat) {
  //     if (!this.socket1) {
  //       this.socket1 = new WebSocket('ws://192.168.63.54:8007/ws/chatbot/' + '123')
  //     }
  //     this.socket1.onopen = (event) => {
  //       console.log('WebSocket1 connection established');
  //     };
  //     if (this.currentIndex === this.welcomeMesg.length - 1) {
  //       if (this.data) {
  //         this.messageObj = new Message();
  //         this.messageObj.question = this.data
  //         this.socket1.send(JSON.stringify(this.messageObj));
  //       }
  //       this.socket1.onmessage = (event) => {

  //         this.messageObj.answer = JSON.parse(event.data);
  //       };
  //       if (this.messageObj?.question || this.messageObj.answer) {
  //         this.messageArray.push(this.messageObj);
  //         this.messageObj = new Message()
  //       }
  //     }
  //     if (this.data) {
  //       this.messageObj = new Message();
  //       this.messageObj.question = this.data

  //       this.socket1.send(JSON.stringify(this.messageObj));
  //       // this.scrollToBottom();
  //     }
  //     this.socket1.onmessage = (event) => {
  //        
  //       this.messageObj.answer = JSON.parse(event.data);
  //       // this.type(this.messageObj?.answer?.answer)
  //       this.type(this.messageObj.answer.answer)
  //       this.type123 = this.messageObj.answer.answer
  //       this.typeString()


  //     };
  //      
  //     if (this.messageObj?.question || this.messageObj.answer) {
  //       this.messageArray.push(this.messageObj);
  //       if (this.messageObj.answer) {
  //         // this.typeString()

  //       }

  //       this.scrollToBottom()
  //     }

  //   }
  //   else {
  //     if (!this.socket2) {
  //       this.socket2 = new WebSocket('ws://192.168.63.54:8009/user/' + '123')
  //       this.data = null
  //     }
  //     // this.socket2.onopen = (event) => {
  //     //   console.log('WebSocket2 connection established');
  //     // };
  //     if (this.data) {
  //       this.messageObj = new Message();
  //       this.messageObj.question = this.data
  //       this.messageArray.push(this.messageObj);
  //       this.socket2.send(JSON.stringify(this.messageObj));
  //     }
  //     this.socket2.onmessage = (event) => {

  //       this.messageObj = new Message();
  //       this.messageObj.answer = JSON.parse(event.data);
  //       this.messageArray.push(this.messageObj);
  //       // this.targetString = message;
  //       this.letMeCheck = true
  //       this.scrollToBottom()
  //     };

  //     if (this.messageObj?.question || this.messageObj?.answer) {

  //     }
  //   }
  // }
  botChat() {

    if (!this.isCustomChat) {
      // if (!this.socket1) {
      //   this.socket1 = new WebSocket('ws://192.168.63.54:8007/ws/chatbot/' + '123')
      // }
      // this.socket1.onopen = (event) => {
      //   console.log('WebSocket1 connection established');
      // };
      if (this.currentIndex === this.welcomeMesg.length - 1) {
        if (this.data) {
          this.messageObj = new Message();
          this.messageObj.question = this.data
          this.socket1.send(JSON.stringify(this.messageObj));
        }
        // this.socket1.onmessage = (event) => {

        //   this.messageObj.answer = JSON.parse(event.data);
        // };
        if (this.messageObj?.question || this.messageObj.answer) {
          this.messageArray.push(this.messageObj);
          this.messageObj = new Message()
        }
      }
      if (this.data) {
        this.messageObj = new Message();
        this.messageObj.question = this.data

        // this.socket1.send(JSON.stringify(this.messageObj));
        // this.scrollToBottom();
      }

      // this.http.get('/assets/bot-answers.json').subscribe((res: any) => {

      // });

      console.log("NEW ANSWER RECEIVED");
      this.messageObj.answer = this.botData[0];
      this.messageObj.answer = this.typeString(this.messageObj.answer)!;


      // this.socket1.onmessage = (event) => {

      //   this.messageObj.answer = JSON.parse(event.data);
      //   // this.type(this.messageObj?.answer?.answer)
      //   // this.type(this.messageObj.answer.answer)
      //   // this.type123 = this.messageObj.answer.answer
      //   this.messageObj.answer = this.typeString(this.messageObj.answer)!;


      // };

      if (this.messageObj?.question || this.messageObj.answer) {
        this.messageArray.push(this.messageObj);
        console.log(this.messageArray);
        if (this.messageObj.answer) {
          // this.typeString()

        }

        this.scrollToBottom()
      }

    }
    else {
      this.agentChat()
    }
  }
  agentChat() {
    debugger
    if (!this.socket2) {
      this.socket2 = new WebSocket('ws://192.168.63.54:8008/user/' + '123')
      this.data = null
    }
    this.socket2.onopen = (event) => {
      console.log('WebSocket2 connection established');
    };
    if (this.data) {
      this.messageObj = new Message();
      this.messageObj.question = this.data
      this.messageArray.push(this.messageObj);
      this.socket2.send(JSON.stringify(this.messageObj));
    }
    this.socket2.onmessage = (event) => {

      this.messageObj = new Message();
      this.messageObj.answer = JSON.parse(event.data);
      this.messageArray.push(this.messageObj);
      // this.targetString = message;
      this.letMeCheck = true
      this.scrollToBottom()
    };

  }
  typingEffect(): void {

    this.targetString = this.welcomeMesg[this.currentIndex];
    let index = 0;
    const typingInterval = setInterval(() => {
      this.typedStrings[this.currentIndex] = this.targetString?.substr(0, index);
      index++;
      if (index > this.targetString.length) {
        clearInterval(typingInterval);
        this.currentIndex++;
        if (this.currentIndex < this.welcomeMesg.length) {
          setTimeout(() => {
            this.typingEffect();
          }, 100);
        }
      }
    }, 50);
    if (this.currentIndex === this.welcomeMesg.length - 1) {
      console.log('HIGH CARD IS TRUE');
      this.hideCard = true;
      // this.agentChat1()
      // this.botChat();

    }
  }
  typeString(answer: any) {
    this.targtString = this.type123
    let index = 0;
    const typingInterval = setInterval(() => {
      this.typedString[this.crntIndex] = answer.answer?.substr(0, index);
      index++;
      if (index > answer.answer?.length) {
        clearInterval(typingInterval);
        this.crntIndex++;
      }
    }, 50);
  }
  type123!: string

}
export class Message {
  answer!: Answer;
  question!: string;
}
export class Answer {
  answer!: string;
  sender!: string;
}