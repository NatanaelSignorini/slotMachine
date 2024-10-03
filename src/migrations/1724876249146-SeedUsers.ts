import { Role } from '@src/modules/roles/entities/role.entity';
import { RolesEnum } from '@src/modules/roles/enums/role.enum';
import { User } from '@src/modules/users/entities/user.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';

const users = [
  {
    userName: 'Admin',
    email: 'admin@email.com',
    password: 'admin',
    role: RolesEnum.ADMIN,
  },
  {
    userName: 'Natanael Signorini',
    email: 'natanaelsignorini@email.com',
    password: '12345678',
    role: RolesEnum.USER,
  },
  {
    userName: 'Franciele Faustino',
    email: 'francielefaustino@email.com',
    password: '12345678',
    role: RolesEnum.USER,
  },
  {
    userName: 'Roberto Allan',
    email: 'Robertoallan@email.com',
    password: '12345678',
    role: RolesEnum.USER,
  },
  {
    userName: 'Amanda Machado',
    email: 'amandomachado@email.com',
    password: '12345678',
    role: RolesEnum.USER,
  },
];

export class SeedUsers1724876249146 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const UserRepo = queryRunner.connection.getRepository(User);
    const RoleRepo = queryRunner.connection.getRepository(Role);

    await Promise.all(
      users.map(async (user) => {
        const existingUser = await UserRepo.findOne({
          where: { email: user.email },
        });

        const role = await RoleRepo.findOne({
          where: { name: user.role },
        });

        if (!existingUser) {
          const newUser = UserRepo.create({
            userName: user.userName,
            email: user.email,
            password: user.password,
            role: role,
          });
          await UserRepo.save(newUser);
        }
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const UserRepo = queryRunner.connection.getRepository(User);
    await UserRepo.delete({ email: 'admin@admin.com.br' });
  }
}
