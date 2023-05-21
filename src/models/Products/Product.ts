//External
import {
    IsBoolean,
    IsInt,
    IsNotEmpty,
    IsNumber,
    IsString,
    Length,
    Max,
    Min
  } from 'class-validator';

const MAX_VALUE_INTEGER = (Number.MAX_SAFE_INTEGER - 1);
const MIN_VALUE_FOR_PRICES = 200;
const MAX_VALUE_FOR_PRICES = 999999999.999;
const MIN_VALUE_FOR_DATE_FORMAT = 2;
const MAX_VALUE_FOR_DATE_FORMAT = 19;



export class Product {
    //Fields
    @IsNotEmpty({message: 'The site id cannot be empty'})
    @IsString({message: 'The site id must be of type string'})
    @Length(2, 20, {message: 'The value of the site id must be between 2 and 20 characters'})
    private siteId: string;

    @IsNotEmpty({message: 'The title cannot be empty'})
    @IsString({message: 'The title must be of type string'})
    @Length(2, 400, {message: 'The value of the title must be between 2 and 400 characters'})
    private title: string;

    @IsString({message: 'The subtitle must be of type string'})
    @Length(2, 500, {message: 'The value of the subtitle must be between 2 and 500 characters'})
    private subtitle: string;
    
    @IsNotEmpty({message: 'The seller id cannot be empty'})
    @IsInt({message: 'The seller id must be of type integer'})
    @Min(1,{message:'Seller ID value must be greater than zero'})
    @Max(MAX_VALUE_INTEGER, {message:`Seller ID value must be less than ${MAX_VALUE_INTEGER}`})
    private sellerId: number;

    @IsNotEmpty({message: 'The category id cannot be empty'})
    @IsString({message: 'The category id must be of type string'})
    @Length(2, 100, {message: 'The value of the category id must be between 2 and 100 characters'})
    private categoryId: string;

    @IsString({message: 'The official store id must be of type string'})
    @Length(2, 100, {message: 'The value of the official store id must be between 2 and 100 characters'})
    private officialStoreId: string;

    @IsNotEmpty({message: 'The price cannot be empty'})
    @IsNumber({allowInfinity: false, allowNaN: false,maxDecimalPlaces: 3},{message: 'The price must be of type number(decimal) and contain only three decimal places after the separator'})
    @Min(MIN_VALUE_FOR_PRICES, {message: `The price value must be greater than ${MIN_VALUE_FOR_PRICES}`})
    @Max(MAX_VALUE_FOR_PRICES, {message: `The price value must be less than ${MAX_VALUE_FOR_PRICES}`})
    private price: number;

    @IsNotEmpty({message: 'The base price cannot be empty'})
    @IsNumber({allowInfinity: false, allowNaN: false,maxDecimalPlaces: 3},{message: 'The base price must be of type number(decimal) and contain only three decimal places after the separator'})
    @Min(MIN_VALUE_FOR_PRICES, {message: `The base price value must be greater than ${MIN_VALUE_FOR_PRICES}`})
    @Max(MAX_VALUE_FOR_PRICES, {message: `The base price value must be less than ${MAX_VALUE_FOR_PRICES}`})
    private basePrice: number;

    @IsNotEmpty({message: 'The original price cannot be empty'})
    @IsNumber({allowInfinity: false, allowNaN: false,maxDecimalPlaces: 3},{message: 'The original price must be of type number(decimal) and contain only three decimal places after the separator'})
    @Min(MIN_VALUE_FOR_PRICES, {message: `The original price value must be greater than ${MIN_VALUE_FOR_PRICES}`})
    @Max(MAX_VALUE_FOR_PRICES, {message: `The original price value must be less than ${MAX_VALUE_FOR_PRICES}`})
    private originalPrice: number;

    @IsNotEmpty({message: 'The initial quantity cannot be empty'})
    @IsNumber({allowInfinity: false, allowNaN: false},{message: 'The initial quantity must be of type number(integer)'})
    @IsInt({message: 'The initial quantity must be of type integer'})
    @Min(1,{message:'Initial quantity value must be greater than zero'})
    @Max(MAX_VALUE_INTEGER, {message:`Initial quantity value must be less than ${MAX_VALUE_INTEGER}`})
    private initialQuantity: number;

    @IsNotEmpty({message: 'The available quantity cannot be empty'})
    @IsNumber({allowInfinity: false, allowNaN: false},{message: 'The available quantity must be of type number(integer)'})
    @IsInt({message: 'The available quantity must be of type integer'})
    @Min(1,{message:'Available quantity value must be greater than zero'})
    @Max(MAX_VALUE_INTEGER, {message:`Available quantity value must be less than ${MAX_VALUE_INTEGER}`})
    private availableQuantity: number;

    @IsNotEmpty({message: 'The has specification cannot be empty'})
    @IsBoolean({message: 'The has specification must be of type boolean'})
    private hasSpecification: boolean;

    @IsNotEmpty({message: 'The creation date cannot be empty'})
    @IsString({message: 'The creation date must be of type string'})
    @Length(MIN_VALUE_FOR_DATE_FORMAT, MAX_VALUE_FOR_DATE_FORMAT, {message: `The value of the creation date must be between ${MIN_VALUE_FOR_DATE_FORMAT} and ${MAX_VALUE_FOR_DATE_FORMAT} characters`})
    private creationDate: string;

    @IsNotEmpty({message: 'The update date cannot be empty'})
    @IsString({message: 'The update date must be of type string'})
    @Length(MIN_VALUE_FOR_DATE_FORMAT, MAX_VALUE_FOR_DATE_FORMAT, {message: `The value of the update date must be between ${MIN_VALUE_FOR_DATE_FORMAT} and ${MAX_VALUE_FOR_DATE_FORMAT} characters`})
    private updateDate: string;

    //Constructor
    constructor($siteId: string, $title: string, $subtitle: string, $sellerId: number, $categoryId: string, $officialStoreId: string, $price: number, $basePrice: number, $originalPrice: number, $initialQuantity: number, $availableQuantity: number, $hasSpecification:boolean,  $creationDate: string, $updateDate: string) {
		this.siteId = $siteId;
		this.title = $title;
		this.subtitle = $subtitle;
		this.sellerId = $sellerId;
		this.categoryId = $categoryId;
		this.officialStoreId = $officialStoreId;
		this.price = $price;
		this.basePrice = $basePrice;
		this.originalPrice = $originalPrice;
		this.initialQuantity = $initialQuantity;
		this.availableQuantity = $availableQuantity;
        this.hasSpecification = $hasSpecification;
		this.creationDate = $creationDate;
        this.updateDate = $updateDate;
	}
    //Setters and getters
    public getSiteId(): string {
        return this.siteId;
    }

    public setSiteId(siteId: string): void {
        this.siteId = siteId;
    }

    public getTitle(): string {
        return this.title;
    }

    public setTitle(title: string): void {
        this.title = title;
    }

    public getSubtitle(): string {
        return this.subtitle;
    }

    public setSubtitle(subtitle: string): void {
        this.subtitle = subtitle;
    }

    public getSellerId(): number {
        return this.sellerId;
    }

    public setSellerId(sellerId: number): void {
        this.sellerId = sellerId;
    }

    public getCategoryId(): string {
        return this.categoryId;
    }

    public setCategoryId(categoryId: string): void {
        this.categoryId = categoryId;
    }

    public getOfficialStoreId(): string {
        return this.officialStoreId;
    }

    public setOfficialStoreId(officialStoreId: string): void {
        this.officialStoreId = officialStoreId;
    }

    public getPrice(): number {
        return this.price;
    }

    public setPrice(price: number): void {
        this.price = price;
    }

    public getBasePrice(): number {
        return this.basePrice;
    }

    public setBasePrice(basePrice: number): void {
        this.basePrice = basePrice;
    }

    public getOriginalPrice(): number {
        return this.originalPrice;
    }

    public setOriginalPrice(originalPrice: number): void {
        this.originalPrice = originalPrice;
    }

    public getInitialQuantity(): number {
        return this.initialQuantity;
    }

    public setInitialQuantity(initialQuantity: number): void {
        this.initialQuantity = initialQuantity;
    }

    public getAvailableQuantity(): number {
        return this.availableQuantity;
    }

    public setAvailableQuantity(availableQuantity: number): void {
        this.availableQuantity = availableQuantity;
    }

    public getHasSpecification(): boolean {
        return this.hasSpecification;
    }

    public setHasSpecification(hasSpecification: boolean): void {
        this.hasSpecification = hasSpecification;
    }

    public getCreationDate(): string {
        return this.creationDate;
    }

    public setCreationDate(creationDate: string): void {
        this.creationDate = creationDate;
    }

    public getUpdateDate(): string {
        return this.updateDate;
    }

    public setUpdateDate(updateDate: string): void {
        this.updateDate = updateDate;
    }

}