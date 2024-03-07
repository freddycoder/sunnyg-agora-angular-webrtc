import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { StreamService } from '../services/stream.service';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss']
})
export class BasicComponent implements OnInit {

  hideBtns = true;

  constructor(public stream: StreamService, public api: ApiService) {
  }

  ngOnInit() {

  }

  async startCall() {
    console.log("Start Call");
    console.log('initOption');
    this.stream.initOption();
    console.log('initOption done');
    const uid = this.stream.generateUid();
    console.log(uid, 'uid');
    const rtcDetails = await this.stream.generateTokenAndUid(uid);
    console.log(rtcDetails, 'rtcDetails')
    this.stream.createRTCClient();
    console.log(this.stream.rtc.client, 'this.stream.rtc.client');
    this.stream.agoraServerEvents(this.stream.rtc);
    console.log('agoraserverevent done.')
    console.log('calling localUser with:', rtcDetails, uid)
    await this.stream.localUser(rtcDetails.token, uid);
    console.log('localUser done.')
    this.hideBtns = false;
    console.log('hideBtns done.')
  }

  async logout() {
    await this.stream.leaveCall();
  }
}
