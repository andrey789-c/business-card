import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Link {
  @Field(() => Int)
  id!: number;

  @Field()
  label!: string;

  @Field()
  url!: string;

  @Field(() => Int)
  profileId!: number;
}

@ObjectType()
export class Skill {
  @Field(() => Int)
  id!: number;

  @Field()
  name!: string;

  @Field(() => Int)
  profileId!: number;
}

@ObjectType()
export class Experience {
  @Field(() => Int)
  id!: number;

  @Field()
  company!: string;

  @Field()
  position!: string;

  @Field()
  period!: string;

  @Field(() => [String])
  achievements!: string[];

  @Field(() => Int)
  profileId!: number;
}

@ObjectType()
export class Project {
  @Field(() => Int)
  id!: number;

  @Field()
  name!: string;

  @Field()
  link!: string;

  @Field(() => Int)
  profileId!: number;
}

@ObjectType()
export class Profile {
  @Field(() => Int)
  id!: number;

  @Field()
  name!: string;

  @Field()
  description!: string;

  @Field(() => [Skill])
  skills!: Skill[];

  @Field(() => [Link])
  links!: Link[];

  @Field(() => [Experience])
  experiences!: Experience[];

  @Field(() => [Project])
  projects!: Project[];
}
