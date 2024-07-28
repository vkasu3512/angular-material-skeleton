import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChatbotService, Message } from '../chatbot.service';

@Component({
  selector: 'app-chat-bot',
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.scss']
})
export class ChatBotComponent implements OnInit {



  hideMenu!: boolean;
  isLastFiscalYear!: boolean
  isCrntFiscalYear!: boolean;
  showTransactions!: boolean;
  isTxnRelated!: boolean;
  isCustumDates!: boolean
  frmDate!:string | null;
  toDate!: string | null;
  isPymntNotSettled!: boolean;
  isPaymentAdvice!: boolean;
  constructor(public dialog: MatDialog,
    public chatbot: ChatbotService,
    public datePipe: DatePipe) {

  }
 
  ngOnInit(): void {
     
    this.chatbot.isPopupClose = false
    this.hideMenu = true;
    this.showTransactions = false;
    if (this.chatbot.welcomeMesg.length === 3) {
      this.chatbot.hideCard = true;
    }
    this.chatbot.userName = localStorage.getItem('useNamee')
    this.chatbot.greetmsges();
    // this.chatbot.constructor()
    // this.chatbot.agentChat1()
  }

  closePopup() {
    this.chatbot.isPopupClose = true
    // this.dialog.open(AlertComponent, { width: '270px', position: { right: '90px', bottom: '200px' }, disableClose: true, hasBackdrop: false }
    // )
  }
  userMessage: string = '';
  isSpace = false;
  getActStmnt() {

    // const httpOptions = new HttpHeaders({ 'Content-Type': 'application/json' });
    // httpOptions.append('Accept', 'application/json');

    // if (this.isLastFiscalYear || this.isCrntFiscalYear || (this.isCustumDates && this.frmDate && this.toDate)) {
    //   if (this.isLastFiscalYear) {
    //     this.frmDate = new Date(2022, 1, 1, 0, 0, 0, 0);
    //     this.toDate = new Date(2022, 12, 31, 0, 0, 0, 0);
    //   }
    //   else if (this.isCrntFiscalYear) {
    //     // this.toDate = this.datePipe.transform(new Date().toDateString(), 'dd/MM/yyyy')
    //     const today = new Date();
    //     const daysAgo = new Date(today);
    //     daysAgo.setDate(daysAgo.getDate() - 365);
    //     // this.frmDate = this.datePipe.transform(daysAgo.toString(), 'dd/MM/yyyy')
    //   }
    //   const stmntDetails = {
    //     'username': 'user_2',
    //     'start_date': this.datePipe.transform(this.frmDate, 'dd/MM/yyyy'),
    //     'end_date': this.datePipe.transform(this.toDate, 'dd/MM/yyyy')
    //   }
    //   console.log(this.frmDate)
    //   this.http.post('http://192.168.63.54:8007/Account_statement', stmntDetails, { headers: httpOptions })
    //     .subscribe((response: any) => {
    //       this.chatbot.messageObj = new Message();
    //       this.chatbot.messageObj.answer = response;
    //       this.chatbot?.messageArray.push(this.chatbot.messageObj)
    //     }
    //     )

    // }
    if (this.isLastFiscalYear || this.isCrntFiscalYear || (this.isCustumDates && this.frmDate && this.toDate)) {
      if (this.isLastFiscalYear) {
        this.frmDate = '01/01/2022'
        this.toDate = '31/12/2022'
        console.log(this.frmDate)
      }
      else if (this.isCrntFiscalYear && this.toDate!==null && !this.frmDate!==null) {
        // this.toDate =         this.datePipe.transform(new Date().toDateString(), 'dd/MM/yyyy')
        this.toDate=this.datePipe.transform(new Date().toDateString(), 'dd/MM/yyyy')
        const today = new Date();
        const daysAgo = new Date(today);
        daysAgo.setDate(daysAgo.getDate() - 365);
        this.frmDate = this.datePipe.transform(daysAgo.toLocaleDateString(), 'dd/MM/yyyy')
      }
      else {
        this.frmDate = this.datePipe.transform(this.frmDate, 'dd/MM/yyyy')
        this.toDate = this.datePipe.transform(this.toDate, 'dd/MM/yyyy')
      }
      let stmntDetails = {
        'merchant_id': 'user_2',
        'start_date': this.frmDate,
        'end_date': this.toDate
      }
      // this.http.post('http://192.168.63.54:8007/Account_statement', stmntDetails, { headers: httpOptions })
      //   .subscribe((response: any) => {
      //     this.chatbot.messageObj = new Message();
      //     this.chatbot.messageObj.answer = response;
      //     this.chatbot.messageArray.push(this.chatbot.messageObj)
      //   }
      //   )

    }
    this.frmDate = '';
    this.toDate = '';
  }
  startChat(loginForm: any) {


    if (this.isCustumDates && !this.userMessage) {
      this.getActStmnt()
    }
    if (this.userMessage) {
      this.chatbot.data = this.userMessage
      loginForm.form.reset();
      console.log('QUESTION IS SENT');
      this.chatbot.botChat();
    }
  }
  checkType(contentType: string) {
    switch (contentType) {
      case 'ACSTMNT':
        this.showTransactions = true;
        this.isTxnRelated = false;
        this.hideMenu = false;
        this.isLastFiscalYear = false
        this.isCustumDates = false;
        this.isCrntFiscalYear = false;
        this.chatbot.hideCard = true;
        break
      case 'TRANSCTION':
        this.showTransactions = false;
        this.isTxnRelated = true;
        this.hideMenu = false;
        this.isLastFiscalYear = false
        this.isCrntFiscalYear = false;
        this.isCustumDates = false;
        this.chatbot.hideCard = false;
        break;
      default:
        break;
    }
  }
  ActStmntType(tranType: string) {
    switch (tranType) {

      case 'CSTM':
        this.isCustumDates = true;
        this.showTransactions = true;
        this.hideMenu = false;
        this.isTxnRelated = false;
        this.isLastFiscalYear = false;
        this.isCrntFiscalYear = false;
        this.chatbot.hideCard = true;
        break
      case 'CFY':
        this.showTransactions = true;
        this.isCrntFiscalYear = true;
        this.isLastFiscalYear = false;
        this.hideMenu = false;
        this.isCustumDates = false;
        this.isTxnRelated = false;
        this.chatbot.hideCard = true;
        break;
      case 'LFY':
        this.showTransactions = true;
        this.isLastFiscalYear = true;
        this.hideMenu = false;
        this.isCustumDates = false;
        this.isTxnRelated = false;
        this.chatbot.hideCard = true;
        this.isCrntFiscalYear = false;

        break;
      default:
        break;
    }
  }
  goToMainMenu() {

    this.chatbot.hideCard = true
    this.hideMenu = true;
    this.showTransactions = false;
    this.isTxnRelated = false;
    this.isLastFiscalYear = false
    this.isCrntFiscalYear = false;
    this.isCustumDates = false;

  }
  checkTxnType(trnType: string) {
    switch (trnType) {
      case 'PYMTNOTSETTLED':
        this.isTxnRelated = false
        this.isPymntNotSettled = true;
        this.isPaymentAdvice = false;
        break;
      case 'PYMTNOTSETTLED':
        this.isTxnRelated = false
        this.isPymntNotSettled = false;
        this.isPaymentAdvice = true;
        break;
      default:
        break;
    }
  }
 



}
