//External
import {
    IsInt,
    IsNotEmpty,
    IsNumber,
    IsString,
    Length,
    Max,
    Min
  } from 'class-validator';


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
    @Length(2, 20, {message: 'The value of the seller id must be between 2 and 20 numbers'})
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
    @Min(200.000)
    @Max(999999999.999)
    private price: number;

    @IsNotEmpty({message: 'The base price cannot be empty'})
    @IsNumber({allowInfinity: false, allowNaN: false,maxDecimalPlaces: 3},{message: 'The base price must be of type number(decimal) and contain only three decimal places after the separator'})
    @Min(200.000)
    @Max(999999999.999)
    private basePrice: number;

    @IsNotEmpty({message: 'The original price cannot be empty'})
    @IsNumber({allowInfinity: false, allowNaN: false,maxDecimalPlaces: 3},{message: 'The original price must be of type number(decimal) and contain only three decimal places after the separator'})
    @Min(200.000)
    @Max(999999999.999)
    private originalPrice: number;

    @IsNotEmpty({message: 'The initial quantity cannot be empty'})
    @IsNumber({allowInfinity: false, allowNaN: false},{message: 'The initial quantity must be of type number(integer)'})
    @IsInt({message: 'The initial quantity must be of type integer'})
    @Length(2, 10, {message: 'The value of the initial quantity must be between 2 and 10 numbers'})
    private initialQuantity: number;

    @IsNotEmpty({message: 'The available quantity cannot be empty'})
    @IsNumber({allowInfinity: false, allowNaN: false},{message: 'The available quantity must be of type number(integer)'})
    @IsInt({message: 'The available quantity must be of type integer'})
    @Length(2, 10, {message: 'The value of the available quantity must be between 2 and 10 numbers'})
    private availableQuantity: number;


    private creationDate: Date;
    private updateDate: Date

    //Constructor
    constructor($siteId: string, $title: string, $subtitle: string, $sellerId: number, $categoryId: string, $officialStoreId: string, $price: number, $basePrice: number, $originalPrice: number, $initialQuantity: number, $availableQuantity: number, $creationDate: Date, $updateDate: Date) {
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

    public getCreationDate(): Date {
        return this.creationDate;
    }

    public setCreationDate(creationDate: Date): void {
        this.creationDate = creationDate;
    }

    public getUpdateDate(): Date {
        return this.updateDate;
    }

    public setUpdateDate(updateDate: Date): void {
        this.updateDate = updateDate;
    }

}