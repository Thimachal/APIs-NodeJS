create table IF NOT EXISTS autores(
	id serial primary key,
	nome text not null,
	idade smallint
);

create table IF NOT EXISTS livros(
	id serial primary key,
	autor_id integer not null,
	nome text not null,
	editora varchar (100),
	genero varchar(50) not null,
	data_publicacao date,
	foreign key (autor_id) references autores (id)
);

create table usuarios(
	id serial primary key,
	nome text not null,
	idade smallint,
	email varchar (80) unique not null,
	telefone text,
	cpf char(11) unique not null
);

create table IF NOT EXISTS emprestimos(
	id serial primary key,
  	usuario_id integer NOT NULL,
  	livro_id integer NOT NULL,
  	status varchar(9) check (status = 'Pendente' or status = 'Devolvido') not null DEFAULT 'Pendente',
  	foreign key (usuario_id) references usuarios(id),
  	foreign key (livro_id) references livros(id)
);


alter table usuarios 
add column senha text not null;

insert  into autores (nome,idade)
values ('Romain Grosjean',38), ('Max', 30);

select * from autores;
select * from livros;
select * from usuarios;
select * from emprestimos;


select autores.nome autor, livros.nome livro
from autores
left join livros on livros.autor_id = autores.id;