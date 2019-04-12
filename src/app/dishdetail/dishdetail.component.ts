import { Component, OnInit, Input,ViewChild,Inject } from '@angular/core';
import {Dish}  from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import 'hammerjs';
import { Comment, Rating } from '../shared/comment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  animations:[
    trigger('visibility', [
      state('shown', style({
        transform:'scale(1.0)',
        opacity:1
      })),
      state('hidden',style({
        transform:'scale(0.5)',
        opacity:0
      })),
      transition('*=>*',animate('0.5s ease-in-out'))
    ])
  ]
})
export class DishdetailComponent implements OnInit {


  dish:Dish;
  dishIds:string[];
  prev:string;
  next:string;
  errMess:string;
  dishcopy:Dish;

  commentForm:FormGroup;
  Comment:Comment;
  visibility= 'shown';
  
  @ViewChild('cform') commentFormDirective;


  formErrors = {
    'author':'',
    'comment':'',
  };
  validationMessages = {
    'author':{
      'required':'First Name is required.',
      'minlength': 'First Name must be at least 2 characters long',
      'maxlength':'First Name cannot be more than 25 characters long'
    },
    'comment':{
      'required':'Last Name is required',
      'minlength':'Last Name must be at least 2 characters long',
    }
  };

  constructor(private dishservice: DishService,
    private route:ActivatedRoute,
    private location:Location,
    @Inject ('BaseURL') private BaseURL,
    private cmt:FormBuilder) { 
      this.createForm();
    }

  ngOnInit() {
    
    // const id= this.route.snapshot.params['id'];
    // this.dishservice.getDish(id)
    //   .subscribe(dish => this.dish = dish);
    //**********  unclear!!!!! */
    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds=dishIds);
    this.route.params.pipe(switchMap((params: Params) => {this.visibility='hidden'; return this.dishservice
    .getDish(params['id']);}))
    .subscribe(dish => { this.dish = dish; this.dishcopy=dish; this.setPrevNext(dish.id); this.visibility='shown'},
      errmess=>this.errMess=<any>errmess);


  }

  createForm():void{
    this.commentForm = this.cmt.group({
      author:['',[Validators.required, Validators.minLength(2)]],
      rating:5,
      comment:['',[Validators.required, Validators.minLength(2),Validators.maxLength(25)]],
    });
    this.commentForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.commentForm) {
        return;
    }
    const form = this.commentForm;
    for (const field in this.formErrors) {
        if (this.formErrors.hasOwnProperty(field)) {
            // clear previous error message (if any)
            this.formErrors[field] = '';
            const control = form.get(field);
            if (control && control.dirty && !control.valid) {
                const messages = this.validationMessages[field];
                for (const key in control.errors) {
                    if (control.errors.hasOwnProperty(key)) {
                        this.formErrors[field] += messages[key] + ' ';
                    }
                }
            }
        }
    }
}

onSubmit() {
  // this.Comment = this.dishRatingForm.value;
  this.commentForm.value.date = new Date();
  this.dish.comments.push(this.commentForm.value);
  this.dishservice.putDish(this.dishcopy)
    .subscribe(dish=>{
      this.dish=dish;this.dishcopy=dish;
    },
    errmess=>{this.dish=null; this.dishcopy=null;this.errMess=<any>errmess;});
  console.log(this.Comment);
  this.commentFormDirective.resetForm();
  this.commentForm.reset({
      author: '',
      comment: '',
      rating: 5
  });
}

  setPrevNext(dishId: string){
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  goBack(): void{
    this.location.back();
  }

}
