import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'User' })
export class User {
  @PrimaryGeneratedColumn({ name: 'Id' })
  id: number;

  @Column({ name: 'Username' })
  username: string;

  @Column({ name: 'Password' })
  password: string;

  @Column({ name: 'RefreshToken', nullable: true })
  refreshToken: string;

  @Column({ name: 'RefreshTokenExpires', type: 'datetime2', nullable: true })
  refreshTokenExpires: Date;
}
