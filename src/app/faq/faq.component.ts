import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';



@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {


  faqs  = [
      { question : "WHAT IS COUNSELING?", answers : "Counseling is a collaborative process which involves the development of a unique, confidential, therapeutic, helping relationship. In this relationship, the therapist acts as a facilitator in helping the client to understand more accurately him/herself and the world around him/her; to better understand their feelings and behaviors; and to assist students in their interpersonal relationships. Discussion of whatever is important and impacting someone's life can enable an individual to grow towards greater freedom in making mature choices and taking responsible action." , panelOpenState : false},
      { question : "WHAT KINDS OF CONCERNS DO STUDENTS BRING TO THE COUNSELING CENTER?", answers : " => I’m stressed out! <br>=>  I’m not doing well in school. <br>=>  I don’t like myself. <br>=>  I’m having problems in a relationship. <br>=>  I have questions about my sexual identity. <br>=>  I’m not enjoying myself as much as I did in the past. <br>=>  I am interested in learning more about and improving myself. <br>=>  I’m concerned about the way I eat.<br>=>  Someone close to me has a problem with alcohol/ drugs.<br>=>  I feel troubled with my thoughts.<br>=>  I’m so anxious that I cannot study or take tests.<br>=>  Sometimes I wonder if I have a problem with alcohol or drugs. <br>=>  Life just doesn’t seem as worthwhile anymore. <br> This is not a comprehensive list of reasons why a student may come to the Counseling Center. Our experienced staff works to provide you with a supportive, non-judgmental environment in which you may work through these or many other issues. We understand that you may feel anxious about coming to the Counseling Center, and our aim is to help you feel comfortable so that you may successfully achieve your counseling goals", panelOpenState : false},
      { question : "WHAT IS COUNSELING LIKE?", answers : "Counseling will be a different experience for different people, as we strive to meet your individual needs based on your unique set of circumstances. In your first session, which is called an 'intake' appointment, you will be asked basic, informational questions and work with your therapist to establish goals for counseling. Goals or recommendations may include a referral for group counseling, couples counseling, signing up for a workshop, and/or a referral to another organization on- or off-campus.<br>  What happens during the course of your counseling experience may differ over time, based on your situation, progress, or changes in your life. Your therapist may at times suggest exploring potential solutions such as relaxation training, journaling, role-playing, talking with relevant individuals, reading assignments, or even “homework.” How the therapeutic process will progress depends on your needs and goals." , panelOpenState : false},
      { question : "WHAT IS GROUP COUNSELING?", answers : "Group counseling may be an alternative or supplement to individual counseling. It may be the best option for students who are coping with relationship or interpersonal concerns, but may also be appropriate for students dealing with issues such as depression or anxiety. The opportunity to meet with other students can provide you with peer support as you learn ways to cope. If your therapist recommends that you join a group, you will likely schedule a meeting with the staff member who leads the group for a “screening” appointment, during which time you will learn more about the group. It will also give the group leader a chance to learn more about your needs and how the group may be able to help you achieve your goals.<br>Along with groups, there are also workshops that focus on specific topics, such as anxiety or stress management. These workshops typically meet for a brief time period, and are more educational in nature than a therapy group." , panelOpenState : false},
      { question : "IS WHAT I SAY IN COUNSELING KEPT CONFIDENTIAL?", answers : "The Counseling Center staff members follow the professional, legal and ethical guidelines of the American Psychological Association and the state of Pennsylvania. This means that information about your counseling sessions is not shared with anyone without your expressed written permission. There are some exceptions to confidentiality, however. If there is the possibility of harm to the client or another person, or in cases of child or elder abuse, Counseling Center staff are mandated to report certain information to the appropriate authorities. Please ask your therapist for more information about confidentiality." , panelOpenState : false},
      { question : "HOW LONG WILL I HAVE TO BE IN COUNSELING?", answers : "Many problems can be dealt with in a brief period of time, but this is not always the case. There is no magic number or formula to determine how long it may take. During your initial intake assessment, you and your therapist will have a conversation around making a determination if your needs are best met by the Counseling Center or are beyond the scope of the short-term services offered. If your counseling needs exceed our session limits, your therapist may make a referral to community resources for continued care.<br> You and your therapist will speak regularly about your progress. Eventually you and your therapist may determine that you have met your therapy goals. At this point, you may discuss your need for continued therapy. You may also bring up this topic at any time during your sessions." , panelOpenState : false},
      { question : "WHEN WILL I START TO FEEL BETTER?", answers : "Again, there is no set timetable for how long it will take until you feel better. Relief may come from a variety of sources, including making changes in your thoughts, behaviors, relationships, and choices, and may take time to achieve. However, many students report that counseling can be helpful even after the first session. This may be because of the relief that comes from deciding to seek help, or an opportunity to speak about problems for the first time with someone who is impartial and nonjudgmental. Please remember: it is important that you share with your therapist if you are not experiencing any improvement after working in therapy for some time, so the two of you may determine what changes may need to be made." , panelOpenState : false},
      { question : "WHAT ARE SOME COMMON MYTHS ABOUT COUNSELING?", answers : "Asking for help is a sign of weakness. <br> Contrary to this belief, it takes a great deal of emotional strength to seek help for problems that may be too overwhelming to manage alone. <br> <br>A therapist will fix my problems right away.<br> The goal of counseling is not for someone else to 'fix' your problems. We are here to help you to identify those concerns and to set goals for yourself. Solving those problems may involve working with your therapist to explore your feelings, thoughts, and behaviors. In doing so, you can explore your options and make a decision for how to best achieve your goals. YOU are the best one to fix your problems!<br><br> A therapist can’t understand what I am going through, because they’re not going through it themselves.<br> We agree that each individual is unique, and to achieve a complete understanding of one’s situation is very difficult. However, our staff members have been trained to learn about, be sensitive to, and respectful of the unique experiences of each client. Those experiences may include concerns related to gender, age, cultural background, racial/ethnic differences, sexual orientation, gender identity, family-of-origin, or socioeconomic issues." , panelOpenState : false},
      
    ];



  constructor(private _apiService: ApiService, private _snack: MatSnackBar) { }
  
  ngOnInit() {



  }

  // percentageDone : number = 0;
  // progressBarDisplay : boolean = false;
  // selectedfile : File;
  // fileSelectionComplete : boolean = false;

  // onFileChanged(event) {
  //   if( event.target.files.length >= 1 ) {
  //     this.selectedfile = event.target.files[0];
  //     this.fileSelectionComplete = true;
  //   }
  // }

  // getFIle() {
  //   document.getElementById("uploadBtn").click();
  // }

  // openSnackBar( message: string) {
  //   this._snack.open(message, '', { 
  //     duration : 200000,
  //     verticalPosition: 'bottom',
  //     panelClass: ['snack-bar']
  //    });
  // }

  // onSubmit() {
  //   console.log(this.selectedfile);
  //   const uploadFile = new FormData();
  //   uploadFile.append('myFile', this.selectedfile, this.selectedfile.name);
  //   this._apiService.postUploadFile(uploadFile).subscribe(
  //     event => {
  //       if ( event.type === HttpEventType.UploadProgress ) {
  //         this.progressBarDisplay = true;
  //         const percentDone = Math.round( 100 * event.loaded / event.total );
  //         this.percentageDone = percentDone;
  //         console.log( " FILE UPLOADED : " + percentDone );
  //       }
  //       if( event instanceof HttpResponse ) {
  //         console.log( "RESPONSE AFTER")
  //         console.log(event);
  //         this.fileSelectionComplete = false;
  //         this.progressBarDisplay = false;
  //         this.openSnackBar("FILE SUCCESSFULLY UPLOADED");
  //       }
  //     }
  //   )
  // }

}
